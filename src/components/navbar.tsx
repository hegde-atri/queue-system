"use client";
import { Authenticated, Unauthenticated } from "convex/react";
import { AuthMenu } from "./auth/auth-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import { ListChecks } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
	const pathname = usePathname();
	const isLoginPage = pathname === "/login";

	return (
		<nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-between px-4 h-16 items-center">
			<Link href="/" className="text-lg font-bold flex gap-2 items-center">
				<ListChecks className="h-6 w-6" />
				<span>QueueFlow</span>
			</Link>
			<div>
				<Authenticated>
					<AuthMenu />
				</Authenticated>
				<Unauthenticated>
					{!isLoginPage && (
						<Button asChild>
							<Link href="/login">Login</Link>
						</Button>
					)}
				</Unauthenticated>
			</div>
		</nav>
	);
}
