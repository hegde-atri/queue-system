import QueueDashboard from "@/components/queue/dashboard";

export default async function QueuePage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const queueId = await params;

	return <QueueDashboard id={queueId.slug} />;
}
