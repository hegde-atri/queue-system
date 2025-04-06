"use client";
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton } from "./auth/sign-in";
import { AuthMenu } from "./auth/auth-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import { ListChecks } from "lucide-react";

export default function Navbar() {
	return (
		<nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-between px-4 h-16 items-center">
			<Authenticated>
				<Link href="/dashboard" className="text-lg font-bold flex gap-2 items-center">
        <ListChecks className="h-6 w-6" />
        <span>QueueFlow</span>
				</Link>
			</Authenticated>
			<Unauthenticated>
				<Link href="/" className="text-lg font-bold flex gap-2 items-center">
        <ListChecks className="h-6 w-6" />
        <span>QueueFlow</span>
				</Link>
			</Unauthenticated>
			<div>
				<Authenticated>
					<AuthMenu />
				</Authenticated>
				<Unauthenticated>
					<SignInButton />
				</Unauthenticated>
			</div>
		</nav>
	);
}
