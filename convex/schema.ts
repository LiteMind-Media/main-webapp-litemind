import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Contact form submissions table
  contacts: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    businessName: v.string(),
    consultationType: v.optional(v.string()),
    message: v.optional(v.string()),
    companySize: v.optional(v.string()),
    budget: v.optional(v.string()),
    timeframe: v.optional(v.string()),
    formType: v.string(), // 'contact', 'enterprise', 'demo', etc.
    source: v.string(), // 'website', 'app', etc.
    createdAt: v.number(), // Timestamp
    isRead: v.boolean(),
  }),
});
