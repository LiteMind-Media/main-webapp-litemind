import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Mutation to store a new contact form submission
export const submitContactForm = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    businessName: v.string(),
    consultationType: v.optional(v.string()),
    message: v.optional(v.string()),
    companySize: v.optional(v.string()),
    budget: v.optional(v.string()),
    timeframe: v.optional(v.string()),
    formType: v.string(),
    source: v.string(),
  },
  handler: async (ctx, args) => {
    const contactId = await ctx.db.insert("contacts", {
      ...args,
      createdAt: Date.now(),
      isRead: false,
    });

    return contactId;
  },
});

// Query to get all contact form submissions
export const getAllContacts = query({
  handler: async (ctx) => {
    return await ctx.db.query("contacts").order("desc").collect();
  },
});

// Query to get unread contact form submissions
export const getUnreadContacts = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("contacts")
      .filter((q) => q.eq(q.field("isRead"), false))
      .order("desc")
      .collect();
  },
});

// Mutation to mark a contact as read
export const markContactAsRead = mutation({
  args: { id: v.id("contacts") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { isRead: true });
  },
});
