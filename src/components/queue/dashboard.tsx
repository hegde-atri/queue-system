"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Doc, Id } from "../../../convex/_generated/dataModel";

export default function QueueDashboard({ id }: { id: string }) {
	var queue;
	var queueItems;

	try {
		queue = useQuery(api.queue.getQueue, { id: id as Id<"queues"> });
	} catch {
		return <div>no queue found</div>;
	}

	// Loading state
	if (queue === undefined) {
		return <div className="p-4">Loading...</div>;
	}

	// Not found state
	if (queue === null) {
		return <div className="p-4">Queue not found</div>;
	}

	try {
		queueItems = useQuery(api.queueItems.getQueueItems, { id: queue._id });
	} catch {
		return (
			<div>
				<h1>No members</h1>
				<p>Share the URL to start</p>
			</div>
		);
	}

	// Render the queue
	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold">{queue.title}</h1>
		</div>
	);
}

import { use, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";

// Sample people in queue
const initialPeople = [
	{
		id: "1",
		name: "John Smith",
		email: "john.smith@example.com",
		joinedAt: "2025-04-07T13:15:00",
		isPriority: true,
		notes: "Issue with account access",
	},
	{
		id: "2",
		name: "Sarah Johnson",
		email: "sarah.j@example.com",
		joinedAt: "2025-04-07T13:20:00",
		isPriority: false,
		notes: "Billing question",
	},
	{
		id: "3",
		name: "Michael Brown",
		email: "michael.b@example.com",
		joinedAt: "2025-04-07T13:35:00",
		isPriority: false,
		notes: "Product return",
	},
	{
		id: "4",
		name: "Emily Davis",
		email: "emily.d@example.com",
		joinedAt: "2025-04-07T13:40:00",
		isPriority: false,
		notes: "Technical support",
	},
	{
		id: "5",
		name: "Robert Wilson",
		email: "robert.w@example.com",
		joinedAt: "2025-04-07T13:55:00",
		isPriority: true,
		notes: "Urgent issue with service",
	},
	{
		id: "6",
		name: "Jennifer Lee",
		email: "jennifer.l@example.com",
		joinedAt: "2025-04-07T14:10:00",
		isPriority: false,
		notes: "General inquiry",
	},
	{
		id: "7",
		name: "David Martinez",
		email: "david.m@example.com",
		joinedAt: "2025-04-07T14:15:00",
		isPriority: false,
		notes: "Password reset",
	},
	{
		id: "8",
		name: "Lisa Taylor",
		email: "lisa.t@example.com",
		joinedAt: "2025-04-07T14:25:00",
		isPriority: false,
		notes: "Subscription question",
	},
];

// Format time
function formatTime(dateString: string) {
	return new Date(dateString).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	});
}

// Calculate wait time in minutes
function calculateWaitTime(joinedAt: string) {
	const joinTime = new Date(joinedAt).getTime();
	const now = new Date().getTime();
	const waitMinutes = Math.floor((now - joinTime) / (1000 * 60));

	return waitMinutes;
}

export function QueueManagementPage(props: Doc<"queues">) {
	const [people, setPeople] = useState(initialPeople);
	const [isEditingTitle, setIsEditingTitle] = useState(false);
	const [isEditingDescription, setIsEditingDescription] = useState(false);
	const [newTitle, setNewTitle] = useState(props.title);
	const [newDescription, setNewDescription] = useState(props.description);
	const [isAddingPerson, setIsAddingPerson] = useState(false);

	var queueItems;

	try {
		queueItems = useQuery(api.queueItems.getQueueItems, { id: props._id });
		console.log(queueItems);
	} catch {
		return <div>no queue found</div>;
	}

	const updateQueue = useMutation(api.queue.updateQueue);
	const updateQueueItem = useMutation(api.queueItems.updateQueueItem);
	const deleteQueueItem = useMutation(api.queueItems.deleteQueueItem);

	// Save queue title
	function saveTitle() {
		updateQueue({
			id: props._id,
			title: newTitle,
			description: newDescription,
		});
		setIsEditingTitle(false);
	}

	// Save queue description
	const saveDescription = () => {
		updateQueue({
			id: props._id,
			title: newTitle,
			description: newDescription,
		});
		setIsEditingDescription(false);
	};

	// Mark person as done (remove from queue)
	const markAsDone = (queueItem: Doc<"queueItems">) => {
		deleteQueueItem({ id: queueItem._id });
	};

	// Remove person from queue
	const removePerson = (queueItem: Doc<"queueItems">) => {
		deleteQueueItem({ id: queueItem._id });
	};

	// Toggle priority status
	const togglePriority = (queueItem: Doc<"queueItems">) => {
		const updatedPriorityStatus = !queueItem.priority;
		updateQueueItem({
			id: queueItem._id,
			user: queueItem.user,
			name: queueItem.name,
			time: queueItem.time,
			ready: queueItem.ready,
			priority: updatedPriorityStatus,
			joinedAt: queueItem.joinedAt,
		});
	};

	// Add new person to queue
	const addPerson = () => {
		setIsAddingPerson(false);
	};

	// Sort people by priority first, then by join time
	const sortedPeople = [...people].sort((a, b) => {
		if (a.isPriority && !b.isPriority) return -1;
		if (!a.isPriority && b.isPriority) return 1;
		return new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime();
	});

	return (
		<div className="flex min-h-[100dvh] flex-col">
			<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="container flex h-16 items-center">
					<Link
						href="/dashboard"
						className="flex items-center gap-2 text-sm font-medium"
					>
						<ChevronLeft className="h-4 w-4" />
						Back to Queues
					</Link>
				</div>
			</header>

			<main className="flex-1 container py-6">
				<div className="flex flex-col space-y-8">
					{/* Queue Details Card */}
					<Card>
						<CardHeader className="pb-3">
							<div className="flex items-start justify-between">
								<div className="space-y-1 flex-1">
									{isEditingTitle ? (
										<div className="flex items-center gap-2">
											<Input
												value={newTitle}
												onChange={(e) => setNewTitle(e.target.value)}
												className="text-xl font-semibold h-10"
												autoFocus
											/>
											<Button size="sm" onClick={saveTitle}>
												<Save className="h-4 w-4 mr-1" /> Save
											</Button>
										</div>
									) : (
										<div className="flex items-center gap-2">
											<CardTitle className="text-xl">{props.title}</CardTitle>
											<Button
												variant="ghost"
												size="sm"
												onClick={() => setIsEditingTitle(true)}
											>
												<Edit className="h-4 w-4" />
												<span className="sr-only">Edit title</span>
											</Button>
										</div>
									)}

									{isEditingDescription ? (
										<div className="flex flex-col gap-2">
											<Textarea
												value={newDescription}
												onChange={(e) => setNewDescription(e.target.value)}
												className="min-h-[80px]"
											/>
											<div>
												<Button size="sm" onClick={saveDescription}>
													<Save className="h-4 w-4 mr-1" /> Save
												</Button>
											</div>
										</div>
									) : (
										<div className="flex items-start gap-2">
											<CardDescription className="flex-1">
												{props.description}
											</CardDescription>
											<Button
												variant="ghost"
												size="sm"
												className="mt-0"
												onClick={() => setIsEditingDescription(true)}
											>
												<Edit className="h-4 w-4" />
												<span className="sr-only">Edit description</span>
											</Button>
										</div>
									)}
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
										<strong>{people.filter((p) => p.isPriority).length}</strong>{" "}
										priority
									</span>
								</div>
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
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Queue Management */}
					<div className="flex justify-between items-center">
						<h2 className="text-xl font-semibold">People in Queue</h2>
						<Dialog open={isAddingPerson} onOpenChange={setIsAddingPerson}>
							<DialogTrigger asChild>
								<Button>
									<PlusCircle className="mr-2 h-4 w-4" />
									Add Person
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Add Person to Queue</DialogTitle>
									<DialogDescription>
										Add a new person to the queue. They will be added to the end
										of the queue.
									</DialogDescription>
								</DialogHeader>
								<div className="grid gap-4 py-4">
									<div className="grid gap-2">
										<label htmlFor="name" className="text-sm font-medium">
											Name
										</label>
									</div>
								</div>
								<DialogFooter>
									<Button
										variant="outline"
										onClick={() => setIsAddingPerson(false)}
									>
										Cancel
									</Button>
									<Button onClick={addPerson}>Add to Queue</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>

					{/* People Table
          {people.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Position</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead className="hidden md:table-cell">Joined At</TableHead>
                    <TableHead className="hidden sm:table-cell">Wait Time</TableHead>
                    <TableHead className="hidden lg:table-cell">Notes</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedPeople.map((person, index) => (
                    <TableRow key={person.id}>
                      <TableCell className="font-medium">
                        {person.isPriority ? (
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            {index + 1}
                          </Badge>
                        ) : (
                          index + 1
                        )}
                      </TableCell>
                      <TableCell>{person.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{person.email}</TableCell>
                      <TableCell className="hidden md:table-cell">{formatTime(person.joinedAt)}</TableCell>
                      <TableCell className="hidden sm:table-cell">{calculateWaitTime(person.joinedAt)} min</TableCell>
                      <TableCell className="hidden lg:table-cell max-w-[200px] truncate">{person.notes}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant={person.isPriority ? "default" : "outline"}
                            size="sm"
                            onClick={() => togglePriority()}
                            title={person.isPriority ? "Remove priority" : "Mark as priority"}
                          >
                            <Star className="h-4 w-4" />
                            <span className="sr-only">
                              {person.isPriority ? "Remove priority" : "Mark as priority"}
                            </span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => markAsDone(person.id)}
                            title="Mark as done"
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span className="sr-only">Mark as done</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removePerson(person.id)}
                            title="Remove from queue"
                          >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground text-center mb-6">There are no people in this queue yet.</p>
                <Button onClick={() => setIsAddingPerson(true)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Person
                </Button>
              </CardContent>
            </Card>
          )} */}
				</div>
			</main>
		</div>
	);
}
