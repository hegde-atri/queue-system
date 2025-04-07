"use client";
import { NewQueue } from "@/components/queue/new";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";
import { Doc } from "../../../convex/_generated/dataModel";
import { AnimatePresence, motion } from "motion/react";
import { Card } from "@/components/ui/card";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DashboardPage() {
	const queues = useQuery(api.queue.getQueues);

	return (
		<div className="flex flex-col py-2 mt-12 container max-w-7xl mx-auto px-4">
			<div className="flex justify-between items-center">
				<h1 className="text-4xl font-bold">Dashboard</h1>
				<NewQueue />
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
				<AnimatePresence mode="popLayout">
					{queues?.map((queue) => <QueueCard queue={queue} key={queue._id} />)}
				</AnimatePresence>
			</div>
		</div>
	);
}

function QueueCard({ queue }: { queue: Doc<"queues"> }) {
	const deleteQueue = useMutation(api.queue.deleteQueue);

	async function handleDeleteQueue() {
		try {
			await deleteQueue({ queueId: queue._id });
			toast.success("Queue deleted successfully");
		} catch (error) {
			toast.error("Failed to delete queue. Please try again later");
		}
	}

	return (
		<motion.div
			key={queue._id}
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.9 }}
			transition={{ duration: 0.2 }}
		>
				<Card className="flex flex-col bg-white shadow-md rounded-lg p-4 gap-2">
					<h2 className="text-xl font-semibold">{queue.title}</h2>
					<p className="text-gray-500">{queue.description}</p>
					<div className="flex justify-between">
						<p></p>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button variant={"destructive"} className="bg-violet-400">
									Delete
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
									<AlertDialogDescription>
										This action cannot be undone. This will permanently delete
										your queue and remove its data from our servers.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancel</AlertDialogCancel>
									<Button variant="destructive" asChild>
										<AlertDialogAction onClick={handleDeleteQueue}>
											Continue
										</AlertDialogAction>
									</Button>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				</Card>
		</motion.div>
	);
}
