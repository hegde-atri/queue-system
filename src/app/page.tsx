import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
	CheckCircle,
	Users,
	ListChecks,
	Star,
	Globe,
	Lock,
	ChevronRight,
	ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { HeroSection } from "@/components/hero";

export default function LandingPage() {
	return (
		<div className="flex min-h-[100dvh] flex-col">
			<main className="">
				<HeroSection
					title="Welcome to Our Platform"
					subtitle={{
						regular: "Manage your queues ",
						gradient: "with ease",
					}}
					description="Create, manage, and share queues online. Perfect for events, customer service, and any situation where you need to organize people efficiently."
					ctaText="Start for free"
					ctaHref="/login"
					bottomImage={{
						light: "https://www.launchuicomponents.com/app-light.png",
						dark: "https://www.launchuicomponents.com/app-dark.png",
					}}
					gridOptions={{
						angle: 65,
						opacity: 0.4,
						cellSize: 50,
						lightLineColor: "#4a4a4a",
						darkLineColor: "#2a2a2a",
					}}
				/>

				{/* Features Section */}
				<section
					id="features"
					className="w-full py-12 md:py-24 lg:py-32 bg-muted"
				>
					<div className="container px-4 md:px-6 mx-auto">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
									Features
								</div>
								<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
									Everything you need to manage queues
								</h2>
								<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
									QueueFlow provides all the tools you need to create and manage
									queues efficiently.
								</p>
							</div>
						</div>
						<div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
							<div className="grid gap-6">
								<div className="flex gap-4 items-start">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
										<ListChecks className="h-5 w-5" />
									</div>
									<div className="space-y-2">
										<h3 className="font-bold">Create & Manage Queues</h3>
										<p className="text-muted-foreground">
											Easily create multiple queues for different purposes and
											manage them all from one dashboard.
										</p>
									</div>
								</div>
								<div className="flex gap-4 items-start">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
										<CheckCircle className="h-5 w-5" />
									</div>
									<div className="space-y-2">
										<h3 className="font-bold">Mark People Off</h3>
										<p className="text-muted-foreground">
											Efficiently process people through your queue with simple
											check-in and check-out functionality.
										</p>
									</div>
								</div>
								<div className="flex gap-4 items-start">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
										<Star className="h-5 w-5" />
									</div>
									<div className="space-y-2">
										<h3 className="font-bold">Priority Marking</h3>
										<p className="text-muted-foreground">
											Flag high-priority individuals to ensure they receive
											attention first when needed.
										</p>
									</div>
								</div>
							</div>
							<div className="grid gap-6">
								<div className="flex gap-4 items-start">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
										<Users className="h-5 w-5" />
									</div>
									<div className="space-y-2">
										<h3 className="font-bold">Multiple Queue Management</h3>
										<p className="text-muted-foreground">
											Handle multiple queues simultaneously for different
											services, locations, or purposes.
										</p>
									</div>
								</div>
								<div className="flex gap-4 items-start">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
										<Globe className="h-5 w-5" />
									</div>
									<div className="space-y-2">
										<h3 className="font-bold">Public Queue Sharing</h3>
										<p className="text-muted-foreground">
											Make queues public so people can see their position and
											estimated wait time from anywhere.
										</p>
									</div>
								</div>
								<div className="flex gap-4 items-start">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
										<Lock className="h-5 w-5" />
									</div>
									<div className="space-y-2">
										<h3 className="font-bold">Flexible Authentication</h3>
										<p className="text-muted-foreground">
											Choose whether authentication is required or optional for
											each queue you create.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Use Cases Section */}
				<section className="w-full py-12 md:py-24 lg:py-32">
					<div className="container px-4 md:px-6 mx-auto">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
									Perfect for any situation
								</h2>
								<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
									QueueFlow works great for a variety of use cases across
									different industries.
								</p>
							</div>
						</div>
						<div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
							<div className="rounded-lg border bg-card p-6 shadow-sm">
								<div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
									<Users className="h-5 w-5 text-primary" />
								</div>
								<h3 className="mb-2 font-bold">Event Check-ins</h3>
								<p className="text-sm text-muted-foreground">
									Streamline entry at conferences, concerts, and other events
									with digital queue management.
								</p>
							</div>
							<div className="rounded-lg border bg-card p-6 shadow-sm">
								<div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
									<CheckCircle className="h-5 w-5 text-primary" />
								</div>
								<h3 className="mb-2 font-bold">Customer Service</h3>
								<p className="text-sm text-muted-foreground">
									Manage support requests efficiently and keep customers
									informed about their wait times.
								</p>
							</div>
							<div className="rounded-lg border bg-card p-6 shadow-sm">
								<div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
									<Star className="h-5 w-5 text-primary" />
								</div>
								<h3 className="mb-2 font-bold">Healthcare</h3>
								<p className="text-sm text-muted-foreground">
									Organize patient visits and prioritize urgent cases in clinics
									and hospitals.
								</p>
							</div>
							<div className="rounded-lg border bg-card p-6 shadow-sm">
								<div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
									<ListChecks className="h-5 w-5 text-primary" />
								</div>
								<h3 className="mb-2 font-bold">Retail</h3>
								<p className="text-sm text-muted-foreground">
									Manage fitting rooms, special services, or high-demand product
									distributions.
								</p>
							</div>
							<div className="rounded-lg border bg-card p-6 shadow-sm">
								<div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
									<Globe className="h-5 w-5 text-primary" />
								</div>
								<h3 className="mb-2 font-bold">Education</h3>
								<p className="text-sm text-muted-foreground">
									Organize office hours, advising sessions, or registration
									periods at schools and universities.
								</p>
							</div>
							<div className="rounded-lg border bg-card p-6 shadow-sm">
								<div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
									<Lock className="h-5 w-5 text-primary" />
								</div>
								<h3 className="mb-2 font-bold">Government Services</h3>
								<p className="text-sm text-muted-foreground">
									Improve citizen experience at DMVs, passport offices, and
									other public service centers.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Pricing Section */}
				<section
					id="pricing"
					className="w-full py-12 md:py-24 lg:py-32 bg-muted"
				>
					<div className="container px-4 md:px-6 mx-auto">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
									Pricing
								</div>
								<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
									Simple, transparent pricing
								</h2>
								<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
									Get started with QueueFlow today at no cost.
								</p>
							</div>
						</div>
						<div className="mx-auto max-w-md py-12">
							<div className="rounded-lg border bg-card shadow-sm">
								<div className="flex flex-col p-6 text-center">
									<h3 className="text-2xl font-bold">Free</h3>
									<div className="mt-4 text-4xl font-bold">$0</div>
									<p className="mt-1 text-sm text-muted-foreground">
										Currently free for all features
									</p>
									<ul className="mt-6 space-y-3 text-left">
										<li className="flex items-center">
											<CheckCircle className="mr-2 h-4 w-4 text-primary" />
											<span>Unlimited queue creation</span>
										</li>
										<li className="flex items-center">
											<CheckCircle className="mr-2 h-4 w-4 text-primary" />
											<span>Priority marking</span>
										</li>
										<li className="flex items-center">
											<CheckCircle className="mr-2 h-4 w-4 text-primary" />
											<span>Public queue sharing</span>
										</li>
										<li className="flex items-center">
											<CheckCircle className="mr-2 h-4 w-4 text-primary" />
											<span>Optional authentication</span>
										</li>
										<li className="flex items-center">
											<CheckCircle className="mr-2 h-4 w-4 text-primary" />
											<span>Multiple queue management</span>
										</li>
										<li className="flex items-center">
											<CheckCircle className="mr-2 h-4 w-4 text-primary" />
											<span>Basic analytics</span>
										</li>
									</ul>
									<Button className="mt-8" size="lg">
										Get Started
									</Button>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="w-full py-12 md:py-24 lg:py-32">
					<div className="container px-4 md:px-6 mx-auto">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
									Ready to streamline your queue management?
								</h2>
								<p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
									Join thousands of organizations that use QueueFlow to manage
									their queues efficiently.
								</p>
							</div>
							<div className="flex flex-col gap-2 min-[400px]:flex-row">
								<Button size="lg" asChild>
									<Link href="/dashboard">Get started for free</Link>
								</Button>
								<Button variant="outline" size="lg" asChild>
									<Link href="mailto:atri@litesite.uk" target="_blank">
										Contact sales
									</Link>
								</Button>
							</div>
						</div>
					</div>
				</section>
			</main>
			<footer className="w-full border-t py-6">
				<div className="container flex flex-col items-center justify-between gap-4 md:flex-row mx-auto">
					<p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
						© {new Date().getFullYear()} QueueFlow. Created and maintained by{" "}
						<Link
							href="https://litesite.uk"
							className="font-medium underline underline-offset-4"
						>
							LiteSite Limited
						</Link>
						.
					</p>
					<nav className="flex gap-4">
						<Link
							href="#"
							className="text-sm font-medium text-muted-foreground underline-offset-4 hover:underline"
						>
							Privacy Policy
						</Link>
					</nav>
				</div>
			</footer>
		</div>
	);
}
