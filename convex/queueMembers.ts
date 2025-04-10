import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getMembers = query({
	args: { queueId: v.id("queues") },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error("User not authenticated");
		}

		const queue = await ctx.db.get(args.queueId);
		if (!queue) {
			throw new Error("Queue not found");
		}
		if (queue.owner !== userId) {
			throw new Error("You are not the owner of this queue");
		}

		const members = await ctx.db
			.query("queueMembers")
			.filter((q) => q.eq(q.field("queueId"), args.queueId))
			.collect();

		return members;
	},
});

export const addMember = mutation({
	args: { queueId: v.id("queues"), user: v.id("users"), role: v.string() },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error("User not authenticated");
		}

		const queue = await ctx.db.get(args.queueId);
		if (!queue) {
			throw new Error("Queue not found");
		}
		if (queue.owner !== userId) {
			throw new Error("You are not the owner of this queue");
		}

		const member = await ctx.db
			.query("queueMembers")
			.filter((q) =>
				q.and(
					q.eq(q.field("queueId"), args.queueId),
					q.eq(q.field("user"), args.user)
				)
			)
			.first();

		if (member) {
			throw new Error("Member already exists");
		}

		await ctx.db.insert("queueMembers", {
			queueId: args.queueId,
			user: args.user,
			role: args.role,
			joinedAt: new Date().toISOString(),
		});
	},
});

export const removeMember = mutation({
	args: { queueId: v.id("queues"), user: v.id("users") },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error("User not authenticated");
		}

		const queue = await ctx.db.get(args.queueId);
		if (!queue) {
			throw new Error("Queue not found");
		}
		if (queue.owner !== userId) {
			throw new Error("You are not the owner of this queue");
		}

		const member = await ctx.db
			.query("queueMembers")
			.filter((q) =>
				q.and(
					q.eq(q.field("queueId"), args.queueId),
					q.eq(q.field("user"), args.user)
				)
			)
			.first();

		if (!member) {
			throw new Error("Member does not exist");
		}

		await ctx.db.delete(member._id);
	},
});

export const updateMember = mutation({
	args: { queueId: v.id("queues"), user: v.id("users"), role: v.string() },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error("User not authenticated");
		}

		const queue = await ctx.db.get(args.queueId);
		if (!queue) {
			throw new Error("Queue not found");
		}
		if (queue.owner !== userId) {
			throw new Error("You are not the owner of this queue");
		}

		const member = await ctx.db
			.query("queueMembers")
			.filter((q) =>
				q.and(
					q.eq(q.field("queueId"), args.queueId),
					q.eq(q.field("user"), args.user)
				)
			)
			.first();

		if (!member) {
			throw new Error("Member does not exist");
		}

		await ctx.db.patch(member._id, {
			role: args.role,
		});
	},
});

export const joinQueue = mutation({
	args: { queueId: v.id("queues"), user: v.id("users")  },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error("User not authenticated");
		}

		const queue = await ctx.db.get(args.queueId);
		if (!queue) {
			throw new Error("Queue not found");
		}

		const member = await ctx.db
			.query("queueMembers")
			.filter((q) =>
				q.and(
					q.eq(q.field("queueId"), args.queueId),
					q.eq(q.field("user"), args.user)
				)
			)
			.first();

		if (member) {
			throw new Error("Member already exists");
		}

		await ctx.db.insert("queueMembers", {
			queueId: args.queueId,
			user: args.user,
			role: "member",
			joinedAt: new Date().toISOString(),
		});
	},
});