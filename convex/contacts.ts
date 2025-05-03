import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Mutation to store a new contact form submission
export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    businessName: v.optional(v.string()),
    consultationType: v.optional(v.string()),
    message: v.optional(v.string()),
    companySize: v.optional(v.string()),
    budget: v.optional(v.string()),
    timeframe: v.optional(v.string()),
    formType: v.optional(v.string()),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Insert the new contact into the database
    const contactId = await ctx.db.insert("contacts", {
      name: args.name,
      email: args.email,
      phone: args.phone || "",
      businessName: args.businessName || "",
      consultationType: args.consultationType || "general",
      message: args.message || "",
      companySize: args.companySize || "",
      budget: args.budget || "",
      timeframe: args.timeframe || "",
      formType: args.formType || "contact",
      source: args.source || "website",
      createdAt: Date.now(),
      isRead: false,
    });
    
    return contactId;
  },
});

// Get all contacts - for admin view
export const getAll = query({
  handler: async (ctx) => {
    const contacts = await ctx.db.query("contacts").order("desc").collect();
    return contacts;
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
