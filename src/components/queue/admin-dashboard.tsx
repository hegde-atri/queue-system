import { Doc } from "../../../convex/_generated/dataModel";
import { AdminQueueCard, QueueMembersTable } from "./common-dashboard";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function AdminDashboard({
	queue,
	queueItems,
}: {
	queue: Doc<"queues">;
	queueItems: Doc<"queueItems">[];
}) {
	const user = useQuery(api.user.currentUser);

	// Handle loading state
	if (!user) {
		return <div className="p-4">Loading user information...</div>;
	}

	return (
		<div className="container mx-auto max-w-7xl mt-12">
			<AdminQueueCard queue={queue} people={queueItems} />
			<QueueMembersTable
				queue={queue}
				people={queueItems}
				currentUserId={user._id}
			/>
		</div>
	);
}
