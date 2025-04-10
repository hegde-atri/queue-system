"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Doc, Id } from "../../../convex/_generated/dataModel";
import NoQueueMembers from "./no-members";
import JoinQueue from "./join-queue";
import AdminDashboard from "./admin-dashboard";
import MemberDashboard from "./member-dashboard";

export default function QueueDashboard({ id }: { id: string }) {
	const queueData = useQuery(api.queue.getQueueWithItemsAndOwner, {
		id: id as Id<"queues">,
	});
	const user = useQuery(api.user.currentUser);

	// Loading state
	if (queueData === undefined) {
		return <div className="p-4">Loading...</div>;
	}

	// Not found state
	if (queueData === null) {
		return <div className="p-4">Queue not found</div>;
	}

	const { queue, queueMembers, queueItems, ownerName } = queueData;

	if (queueMembers?.length <= 0 && queue.owner === user!._id) {
		return <NoQueueMembers />;
	}
	if (queueMembers?.length <= 0) {
		return <JoinQueue queue={queue} ownerName={ownerName!} user={user!} />;
	}

	if (queue.owner === user!._id) {
		return (
			<AdminDashboard queue={queue} queueItems={queueItems} />
		)
	}

	return (
		<MemberDashboard queue={queue} queueItems={queueItems} />
	);
}
