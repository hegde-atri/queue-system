import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const bookmark = mutation({
	args: { queueId: v.id("queues") },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error("User not authenticated");
		}

		// Check if queue exists
		const queue = await ctx.db.get(args.queueId);
		if (!queue) {
			throw new Error("Queue not found");
		}

		// Check if bookmark already exists
		const existingBookmark = await ctx.db
			.query("bookmarks")
			.filter((q) =>
				q.and(
					q.eq(q.field("queueId"), args.queueId),
					q.eq(q.field("user"), userId)
				)
			)
			.first();

		if (existingBookmark) {
			throw new Error("Queue already bookmarked");
		}

		// Create bookmark
		const bookmarkId = await ctx.db.insert("bookmarks", {
			queueId: args.queueId,
			user: userId,
		});

		return bookmarkId;
	},
});

export const unbookmark = mutation({
	args: { queueId: v.id("queues") },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error("User not authenticated");
		}

		// Check if bookmark exists
		const bookmark = await ctx.db
			.query("bookmarks")
			.filter((q) =>
				q.and(
					q.eq(q.field("queueId"), args.queueId),
					q.eq(q.field("user"), userId)
				)
			)
			.first();

		if (!bookmark) {
			throw new Error("Bookmark not found");
		}

		// Delete bookmark
		await ctx.db.delete(bookmark._id);

		return bookmark._id;
	},
});

export const getBookmarks = query({
	args: {},
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error("User not authenticated");
		}

		// Get all bookmarks for this user
		const bookmarks = await ctx.db
			.query("bookmarks")
			.filter((q) => q.eq(q.field("user"), userId))
			.collect();

		// Get the queue details for each bookmark
		const queuePromises = bookmarks.map(async (bookmark) => {
			const queue = await ctx.db.get(bookmark.queueId);
			if (!queue) return null;
			return {
				bookmark: bookmark._id,
				queue,
			};
		});

		const results = await Promise.all(queuePromises);

		// Filter out any null results (in case a queue was deleted)
		return results.filter((result) => result !== null);
	},
});
