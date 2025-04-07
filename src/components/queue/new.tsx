"use client";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from "@/components/queue/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";
import { useState } from "react";
import { PlusCircle } from "lucide-react";

const formSchema = z.object({
	title: z.string().min(1, {
		message: "Name is required",
	}),
	description: z.string().min(1, {
		message: "Description is required",
	}),
});

export function NewQueue() {
  const [open, setOpen] = useState(false);
	const createQueue = useMutation(api.queue.createQueue);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			description: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			await createQueue(values);
			form.reset();
      toast.success("Queue created successfully");
      setOpen(false);
		} catch (error) {
      toast.error("Error creating queue. Please try again later.");
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Button asChild>
				<DialogTrigger className=""><PlusCircle />Create Queue</DialogTrigger>
			</Button>
			<DialogContent className="w-full max-w-md bg-white p-6 dark:bg-zinc-900">
				<DialogHeader>
					<DialogTitle className="text-zinc-900 dark:text-white">
						Create new queue
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 mt-8"
					>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder="What queue?" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input placeholder="What am I queuing for?" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Submit</Button>
					</form>
				</Form>

				<DialogClose />
			</DialogContent>
		</Dialog>
	);
}
