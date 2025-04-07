import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";
 
const schema = defineSchema({
  ...authTables,
  queues: defineTable({
    title: v.string(),
    description: v.string(),
    owner: v.id("users")
  }),
  queueMembers: defineTable({
    queueId: v.id("queues"),
    user: v.id("users"),
    // admin, member
    role: v.string(),
    joinedAt: v.string(),
  }),
  queueItems: defineTable({
    queueId: v.id("queues"),
    name: v.string(),
    ready: v.boolean(),
    user: v.id("users"),
    createdAt: v.string(),
    updatedAt: v.string(),
  }),
  bookmarks: defineTable({
    queueId: v.id("queues"),
    user: v.id("users"),
  }),
});
 
export default schema;