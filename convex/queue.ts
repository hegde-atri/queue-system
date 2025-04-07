import { v } from "convex/values";
import { mutation, query  } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const createQueue = mutation({
	args: { title: v.string(), description: v.string() },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error("User not authenticated");
		}

		const queueId = await ctx.db.insert("queues", {
			title: args.title,
			description: args.description,
			owner: userId,
		});
		return queueId;
	},
});

export const getQueues = query({
	args: {},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error("User not authenticated");
		}
		return await ctx.db
			.query("queues")
			.filter((q) => q.eq(q.field("owner"), userId))
			.order("desc")
			.collect();
	},
});

export const getQueue = query({
	args: { id: v.id("queues") },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error("User not authenticated");
		}

		const queue = await ctx.db.get(args.id);
    const queueMembers = await ctx.db.query
		if (!queue || queue.owner !== userId) {
			throw new Error("Queue not found or not owned by user");
		}

		return queue;
	},
});

export const deleteQueue = mutation({
	args: { queueId: v.id("queues") },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error("User not authenticated");
		}

		const queue = await ctx.db.get(args.queueId);
		if (!queue || queue.owner !== userId) {
			throw new Error("Queue not found or not owned by user");
		}

		await ctx.db.delete(args.queueId);
	},
});
