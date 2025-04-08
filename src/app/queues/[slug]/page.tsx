import QueueDashboard from "@/components/queue/dashboard";
import { Id } from "../../../../convex/_generated/dataModel";

export default async function QueuePage({ params }: { params: Promise<{ slug: string }>; }) {
  const queueId = await params;

  return (
    <div>
      <QueueDashboard id={queueId.slug} />
    </div>
  )
};
