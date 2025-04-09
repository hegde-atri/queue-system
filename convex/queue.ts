import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
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

		if (!queue) {
			throw new Error("Queue not found");
		}

		// const member = await ctx.db
		// 	.query("queueMembers")
		// 	.filter((q) =>
		// 		q.and(q.eq(q.field("queueId"), args.id), q.eq(q.field("user"), userId))
		// 	)
		// 	.first();
		// if (!member) {
		// 	throw new Error("You are not a member of this queue");
		// }

		// check if user is member of the queue

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

export const updateQueue = mutation({
	args: { id: v.id("queues"), title: v.string(), description: v.string() },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error("User not authenticated");
		}

		const queue = await ctx.db.get(args.id);
		if (!queue || queue.owner !== userId) {
			throw new Error("Queue not found or not owned by user");
		}

		await ctx.db.patch(args.id, {
			title: args.title,
			description: args.description,
		});
	},
});
