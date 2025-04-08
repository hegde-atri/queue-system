import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import Navbar from "@/components/navbar";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { Toaster } from "sonner";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Queue Flow",
	description: "Create, manage, and share queues online. Perfect for events, customer service, and any situation where you need to organize people efficiently.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
    <ConvexAuthNextjsServerProvider>
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
			>
        <ConvexClientProvider>
          <Navbar />
          <main className="grow">
          {children}
          </main>
					<Toaster richColors closeButton  />
        </ConvexClientProvider>
			</body>
		</html>
    </ConvexAuthNextjsServerProvider>
	);
}
