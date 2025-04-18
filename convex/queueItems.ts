import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getQueueItems = query({
	args: { id: v.id("queues") },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error("User not authenticated");
		}
		const queue = await ctx.db.get(args.id);
		if (!queue) {
			throw new Error("Queue not found");
		}

		// if (!member && queue.owner != userId) {
		//   throw new Error("You are not a member of this queue");
		// }

		const queueItems = await ctx.db
			.query("queueItems")
			.filter((q) => q.eq(q.field("queueId"), args.id))
			.collect();

		if (!queueItems) {
			throw new Error("Queue items not found");
		}

		return queueItems;
	},
});

export const getQueueItem = query({
	args: { id: v.id("queueItems") },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error("User not authenticated");
		}

		const queueItem = await ctx.db.get(args.id);
		if (!queueItem) {
			throw new Error("Queue item not found");
		}

		const queue = await ctx.db.get(queueItem.queueId);
		if (!queue) {
			throw new Error("Queue not found");
		}
		const member = await ctx.db
			.query("queueMembers")
			.filter((q) =>
				q.and(
					q.eq(q.field("queueId"), queueItem.queueId),
					q.eq(q.field("user"), userId)
				)
			)
			.first();
		if (!member) {
			throw new Error("You are not a member of this queue");
		}

		return queueItem;
	},
});

export const createQueueItem = mutation({
	args: {
		id: v.id("queues"),
		name: v.optional(v.string()),
		notes: v.optional(v.string()),
		ready: v.optional(v.boolean()),
		priority: v.optional(v.boolean()),
		user: v.optional(v.id("users")),
		joinedAt: v.string(),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error("User not authenticated");
		}

		const queue = await ctx.db.get(args.id);
		if (!queue) {
			throw new Error("Queue not found");
		}
		const member = await ctx.db
			.query("queueMembers")
			.filter((q) =>
				q.and(q.eq(q.field("queueId"), args.id), q.eq(q.field("user"), userId))
			)
			.first();
		if (!member) {
			throw new Error("You are not a member of this queue");
		}

		if (member.role !== "admin" && queue.owner !== userId) {
			throw new Error("You are not an admin of this queue");
		}

		const queueItem = await ctx.db.insert("queueItems", {
			queueId: args.id,
			name: args.name,
			notes: args.notes,
			ready: false,
			priority: false,
			user: userId,
			joinedAt: new Date().toISOString(),
		});

		return queueItem;
	},
});

export const updateQueueItem = mutation({
	args: {
		id: v.id("queueItems"),
		name: v.optional(v.string()),
		notes: v.optional(v.string()),
		ready: v.optional(v.boolean()),
		priority: v.optional(v.boolean()),
		user: v.optional(v.id("users")),
		joinedAt: v.string(),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error("User not authenticated");
		}

		const queueItem = await ctx.db.get(args.id);
		if (!queueItem) {
			throw new Error("Queue item not found");
		}

		const queue = await ctx.db.get(queueItem.queueId);
		if (!queue) {
			throw new Error("Queue not found");
		}
		const member = await ctx.db
			.query("queueMembers")
			.filter((q) =>
				q.and(
					q.eq(q.field("queueId"), queueItem.queueId),
					q.eq(q.field("user"), userId)
				)
			)
			.first();
		if (!member) {
			throw new Error("You are not a member of this queue");
		}

		if (member.role !== "admin" && queue.owner !== userId) {
			throw new Error("You are not an admin of this queue");
		}

		await ctx.db.patch(args.id, {
			name: args.name,
			notes: args.notes,
			ready: args.ready,
			priority: args.priority,
			user: args.user,
			joinedAt: args.joinedAt,
		});
	},
});

export const deleteQueueItem = mutation({
	args: { id: v.id("queueItems") },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error("User not authenticated");
		}

		const queueItem = await ctx.db.get(args.id);
		if (!queueItem) {
			throw new Error("Queue item not found");
		}

		const queue = await ctx.db.get(queueItem.queueId);
		if (!queue) {
			throw new Error("Queue not found");
		}
		const member = await ctx.db
			.query("queueMembers")
			.filter((q) =>
				q.and(
					q.eq(q.field("queueId"), queueItem.queueId),
					q.eq(q.field("user"), userId)
				)
			)
			.first();
		if (!member) {
			throw new Error("You are not a member of this queue");
		}
		if (member.role !== "admin" && queue.owner !== userId) {
			throw new Error("You are not an admin of this queue");
		}
		await ctx.db.delete(args.id);
	},
});

export const joinQueue = mutation({
	args: { queueId: v.id("queues"), notes: v.optional(v.string()) },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error("User not authenticated");
		}

		// Verify the queue exists
		const queue = await ctx.db.get(args.queueId);
		if (!queue) {
			throw new Error("Queue not found");
		}

		// Get the user's information to include their name
		const user = await ctx.db.get(userId);
		if (!user) {
			throw new Error("User information not found");
		}

		// Check if user is already in the queue
		const existingQueueItem = await ctx.db
			.query("queueItems")
			.filter((q) =>
				q.and(
					q.eq(q.field("queueId"), args.queueId),
					q.eq(q.field("user"), userId)
				)
			)
			.first();

		if (existingQueueItem) {
			throw new Error("You are already in this queue");
		}

		// Create a new queue item for the user
		const queueItem = await ctx.db.insert("queueItems", {
			queueId: args.queueId,
			name: user.name,
			notes: args.notes,
			ready: false,
			priority: false,
			user: userId,
			joinedAt: new Date().toISOString(),
		});

		return queueItem;
	},
});

export const isUserInQueue = query({
	args: { queueId: v.id("queues") },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error("User not authenticated");
		}

		// Verify the queue exists
		const queue = await ctx.db.get(args.queueId);
		if (!queue) {
			throw new Error("Queue not found");
		}

		// Check if user is in the queue
		const queueItem = await ctx.db
			.query("queueItems")
			.filter((q) =>
				q.and(
					q.eq(q.field("queueId"), args.queueId),
					q.eq(q.field("user"), userId)
				)
			)
			.first();

		return queueItem !== null;
	},
});

export const leaveQueue = mutation({
	args: { queueId: v.id("queues") },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error("User not authenticated");
		}

		// Verify the queue exists
		const queue = await ctx.db.get(args.queueId);
		if (!queue) {
			throw new Error("Queue not found");
		}

		// Find the user's queue item
		const queueItem = await ctx.db
			.query("queueItems")
			.filter((q) =>
				q.and(
					q.eq(q.field("queueId"), args.queueId),
					q.eq(q.field("user"), userId)
				)
			)
			.first();

		if (!queueItem) {
			throw new Error("You are not in this queue");
		}

		// Remove the user from the queue
		await ctx.db.delete(queueItem._id);
		return queueItem._id;
	},
});
