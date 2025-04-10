"use client";
import { useMutation, useQuery } from "convex/react";
import { Doc } from "../../../convex/_generated/dataModel";
import { api } from "../../../convex/_generated/api";
import { Card, CardAction, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";

export default function JoinQueue({
	queue,
	ownerName,
	user,
}: {
	queue: Doc<"queues">;
	ownerName: string;
	user: Doc<"users">;
}) {
	const joinQueue = useMutation(api.queueMembers.joinQueue);
	const [loading, setLoading] = useState(false);

	async function handleJoinQueue() {
		setLoading(true);
		await joinQueue({ queueId: queue._id, user: user._id });
		setLoading(false);
    // refresh page
    window.location.reload();
	}

	return (
		<div className="container max-w-3xl mx-auto mt-12 items-center">
			<Card className="">
				<CardHeader>
					<h1 className="text-2xl">{queue.title}</h1>
					<p className="text-gray-500">By: {ownerName}</p>
				</CardHeader>
				<CardContent className="">
					<p>{queue.description}</p>
				</CardContent>
				<CardAction className="px-5">
					<Button onClick={handleJoinQueue} disabled={loading}>
						{}Join Now
					</Button>
				</CardAction>
			</Card>
		</div>
	);
}
