import { Doc } from "../../../convex/_generated/dataModel";
import { AdminQueueCard } from "./common-dashboard";

export default function AdminDashboard({
  queue,
  queueItems,
}: {
  queue: Doc<"queues">;
  queueItems: Doc<"queueItems">[];
}) {
  return (
    <div className="container mx-auto max-w-7xl mt-12">
      <AdminQueueCard queue={queue} people={queueItems}  />
    </div>
  )
}