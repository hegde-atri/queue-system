"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SignInButton } from "@/components/auth/sign-in";

export default function SignIn() {
	return (
		<div className="flex flex-col mt-24 items-center">
			<Card className="max-w-md w-full">
				<CardHeader>
					<CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
					<CardDescription className="text-xs md:text-sm">
						<span className="italic bg-red-200 rounded-md px-1">
							🚧 We are currently under construction, the application is planned
							to be ready for production by the 25th of April 🚧
						</span>
						<br />
						<br />
						We are limited to Google sign-in for now. Please use your Google
						account to sign in.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						<div
							className={cn(
								"w-full gap-2 flex items-center",
								"justify-between flex-col"
							)}
						>
							<SignInButton />
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
