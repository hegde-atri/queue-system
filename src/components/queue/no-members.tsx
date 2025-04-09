"use client";
import QRCode from "qrcode";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
export default function NoQueueMembers() {
	// depending on if process.env.NODE_ENV is production or development, set url to be different domain
	const url =
		process.env.NODE_ENV === "production"
			? "https://queue.litesite.dev"
			: "http://localhost:3000";

	const inviteLink = `${url}/invite`;
	const [src, setSrc] = useState("");

	QRCode.toDataURL(inviteLink).then(setSrc);

	return (
		<div className="flex flex-col items-center justify-center h-full mt-12">
			<p className="text-lg font-semibold text-gray-700">
				No members in this queue
			</p>
			<p className="text-sm text-gray-500">
				Invite some friends to join the queue!
			</p>
			{src === "" ? (
				<Skeleton className="w-36 h-36"></Skeleton>
			) : (
				<img src={src} />
			)}
		</div>
	);
}
