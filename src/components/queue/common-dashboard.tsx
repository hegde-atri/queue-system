import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChevronLeft,
	Edit,
	Save,
	Star,
	Trash,
	CheckCircle,
	PlusCircle,
	Clock,
	Users,
	Bookmark,
	BookmarkCheck,
	Loader2,
} from "lucide-react";
import {
	MorphingDialog,
	MorphingDialogTrigger,
	MorphingDialogContent,
	MorphingDialogTitle,
	MorphingDialogImage,
	MorphingDialogSubtitle,
	MorphingDialogClose,
	MorphingDialogDescription,
	MorphingDialogContainer,
} from "@/components/motion/morphing-dialog";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { Doc, Id } from "../../../convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";

export function AdminQueueCard({
	queue,
	people,
}: {
	queue: Doc<"queues">;
	people: Doc<"queueItems">[];
}) {
	const [isEditing, setIsEditing] = useState(false);
	const [newTitle, setNewTitle] = useState(queue.title);
	const [newDescription, setNewDescription] = useState(queue.description);

	return (
		<Card>
			<CardHeader className="pb-3">
				<div className="flex items-start justify-between">
					<div className="space-y-1 flex-1">
						// Create morphing dialog here
						<MorphingDialog
							transition={{
								type: "spring",
								bounce: 0.05,
								duration: 0.25,
							}}
						>
							<MorphingDialogTrigger
								style={{
									borderRadius: "12px",
								}}
								className="flex max-w-[270px] flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900"
							>
								<MorphingDialogImage
									src="/eb-27-lamp-edouard-wilfrid-buquet.jpg"
									alt="A desk lamp designed by Edouard Wilfrid Buquet in 1925. It features a double-arm design and is made from nickel-plated brass, aluminium and varnished wood."
									className="h-48 w-full object-cover"
								/>
								<div className="flex grow flex-row items-end justify-between px-3 py-2">
									<div>
										<MorphingDialogTitle className="text-zinc-950 dark:text-zinc-50">
											EB27
										</MorphingDialogTitle>
										<MorphingDialogSubtitle className="text-zinc-700 dark:text-zinc-400">
											Edouard Wilfrid Buquet
										</MorphingDialogSubtitle>
									</div>
									<button
										type="button"
										className="relative ml-1 flex h-6 w-6 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:bg-zinc-900 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-500"
										aria-label="Open dialog"
									>
										<PlusIcon size={12} />
									</button>
								</div>
							</MorphingDialogTrigger>
							<MorphingDialogContainer>
								<MorphingDialogContent
									style={{
										borderRadius: "24px",
									}}
									className="pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900 sm:w-[500px]"
								>
									<MorphingDialogImage
										src="/eb-27-lamp-edouard-wilfrid-buquet.jpg"
										alt="A desk lamp designed by Edouard Wilfrid Buquet in 1925. It features a double-arm design and is made from nickel-plated brass, aluminium and varnished wood."
										className="h-full w-full"
									/>
									<div className="p-6">
										<MorphingDialogTitle className="text-2xl text-zinc-950 dark:text-zinc-50">
											EB27
										</MorphingDialogTitle>
										<MorphingDialogSubtitle className="text-zinc-700 dark:text-zinc-400">
											Edouard Wilfrid Buquet
										</MorphingDialogSubtitle>
										<MorphingDialogDescription
											disableLayoutAnimation
											variants={{
												initial: { opacity: 0, scale: 0.8, y: 100 },
												animate: { opacity: 1, scale: 1, y: 0 },
												exit: { opacity: 0, scale: 0.8, y: 100 },
											}}
										>
											<p className="mt-2 text-zinc-500 dark:text-zinc-500">
												Little is known about the life of Édouard-Wilfrid
												Buquet. He was born in France in 1866, but the time and
												place of his death is unfortunately a mystery.
											</p>
											<p className="text-zinc-500">
												Research conducted in the 1970s revealed that he’d
												designed the “EB 27” double-arm desk lamp in 1925,
												handcrafting it from nickel-plated brass, aluminium and
												varnished wood.
											</p>
											<a
												className="mt-2 inline-flex text-zinc-500 underline"
												href="https://www.are.na/block/12759029"
												target="_blank"
												rel="noopener noreferrer"
											>
												Are.na block
											</a>
										</MorphingDialogDescription>
									</div>
									<MorphingDialogClose className="text-zinc-50" />
								</MorphingDialogContent>
							</MorphingDialogContainer>
						</MorphingDialog>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex flex-wrap gap-6">
					<div className="flex items-center">
						<Users className="mr-2 h-4 w-4 text-muted-foreground" />
						<span>
							<strong>{people.length}</strong>{" "}
							{people.length === 1 ? "person" : "people"} in queue
						</span>
					</div>
					<div className="flex items-center">
						<Star className="mr-2 h-4 w-4 text-muted-foreground" />
						<span>
							<strong>{people.filter((p) => p.priority).length}</strong>{" "}
							priority
						</span>
					</div>
					{/* TODO: wait time
           <div className="flex items-center">
						<Clock className="mr-2 h-4 w-4 text-muted-foreground" />
						<span>
							Average wait:{" "}
							<strong>
								{people.length > 0
									? Math.round(
											people.reduce(
												(acc, p) => acc + calculateWaitTime(p.joinedAt),
												0
											) / people.length
										)
									: 0}{" "}
								min
							</strong>
						</span>
					</div> */}
				</div>
			</CardContent>
		</Card>
	);
}

export function MemberQueueCard({
	queue,
	people,
}: {
	queue: Doc<"queues">;
	people: Doc<"queueItems">[];
}) {
	const [isBookmarking, setIsBookmarking] = useState(false);

	// Get all bookmarks to check if this queue is bookmarked
	const bookmarks = useQuery(api.bookmark.getBookmarks);
	const isBookmarked = bookmarks?.some(
		(bookmark) => bookmark.queue._id === queue._id
	);

	// Get mutations for bookmarking/unbookmarking
	const bookmarkQueue = useMutation(api.bookmark.bookmark);
	const unbookmarkQueue = useMutation(api.bookmark.unbookmark);

	// Handle bookmark toggling
	const handleBookmarkToggle = async () => {
		try {
			setIsBookmarking(true);

			if (isBookmarked) {
				await unbookmarkQueue({ queueId: queue._id });
				toast.success("Queue removed from bookmarks");
			} else {
				await bookmarkQueue({ queueId: queue._id });
				toast.success("Queue added to bookmarks");
			}
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "Failed to update bookmark"
			);
		} finally {
			setIsBookmarking(false);
		}
	};

	return (
		<Card>
			<CardHeader className="pb-3">
				<div className="flex items-start justify-between">
					<div className="space-y-1 flex-1">
						<div className="flex items-center gap-2">
							<CardTitle className="text-xl">{queue.title}</CardTitle>
							<Button
								variant="ghost"
								size="sm"
								onClick={handleBookmarkToggle}
								disabled={isBookmarking || bookmarks === undefined}
							>
								{bookmarks === undefined ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : isBookmarking ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : isBookmarked ? (
									<BookmarkCheck className="h-4 w-4" />
								) : (
									<Bookmark className="h-4 w-4" />
								)}
								<span className="sr-only">
									{isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
								</span>
							</Button>
						</div>

						<div className="flex items-start gap-2">
							<CardDescription className="flex-1">
								{queue.description}
							</CardDescription>
						</div>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex flex-wrap gap-6">
					<div className="flex items-center">
						<Users className="mr-2 h-4 w-4 text-muted-foreground" />
						<span>
							<strong>{people.length}</strong>{" "}
							{people.length === 1 ? "person" : "people"} in queue
						</span>
					</div>
					<div className="flex items-center">
						<Star className="mr-2 h-4 w-4 text-muted-foreground" />
						<span>
							<strong>{people.filter((p) => p.priority).length}</strong>{" "}
							priority
						</span>
					</div>
					{/* <div className="flex items-center">
						<Clock className="mr-2 h-4 w-4 text-muted-foreground" />
						<span>
							Average wait:{" "}
							<strong>
								{people.length > 0
									? Math.round(
											people.reduce(
												(acc, p) => acc + calculateWaitTime(p.joinedAt),
												0
											) / people.length
										)
									: 0}{" "}
								min
							</strong>
						</span>
					</div> */}
				</div>
			</CardContent>
		</Card>
	);
}

export function MemberQueueActionBar({ queue }: { queue: Doc<"queues"> }) {
	const [isJoining, setIsJoining] = useState(false);
	const [showJoinDialog, setShowJoinDialog] = useState(false);
	const [notes, setNotes] = useState("");

	// Use the new query to check if user is in queue
	const isUserInQueue = useQuery(api.queueItems.isUserInQueue, {
		queueId: queue._id,
	});

	// Get the mutations for joining the queue
	const joinQueueMutation = useMutation(api.queueItems.joinQueue);

	// Handle joining the queue
	const handleJoinQueue = async () => {
		try {
			setIsJoining(true);

			// Then add to the queue with notes
			await joinQueueMutation({
				queueId: queue._id,
				notes: notes.trim() || undefined,
			});

			toast.success("You've joined the queue successfully");
			setShowJoinDialog(false);
			setNotes("");
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "Failed to join queue"
			);
		} finally {
			setIsJoining(false);
		}
	};

	// Show loading state while checking if user is in queue
	if (isUserInQueue === undefined) {
		return (
			<div className="flex justify-between items-center mt-8 mb-4">
				<h2 className="text-xl font-semibold">Queue Actions</h2>
				<Button disabled>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					Loading...
				</Button>
			</div>
		);
	}

	return (
		<div className="flex justify-between items-center mt-8 mb-4">
			<h2 className="text-xl font-semibold">Queue Actions</h2>

			<Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
				<DialogTrigger asChild>
					<Button disabled={isUserInQueue}>
						<PlusCircle className="mr-2 h-4 w-4" />
						{isUserInQueue ? "Already in Queue" : "Join Queue"}
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Join Queue</DialogTitle>
						<DialogDescription>
							Add yourself to the queue. You'll be notified when it's your turn.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<label htmlFor="notes" className="text-sm font-medium">
								Add notes (optional)
							</label>
							<Textarea
								id="notes"
								placeholder="Any special requirements or information?"
								value={notes}
								onChange={(e) => setNotes(e.target.value)}
							/>
						</div>
					</div>
					<DialogFooter>
						<Button variant="outline" onClick={() => setShowJoinDialog(false)}>
							Cancel
						</Button>
						<Button onClick={handleJoinQueue} disabled={isJoining}>
							{isJoining ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Joining...
								</>
							) : (
								"Join Queue"
							)}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export function QueueList() {}
