import { Doc } from "../../../convex/_generated/dataModel";
import { MemberQueueActionBar, MemberQueueCard } from "./common-dashboard";

export default function MemberDashboard({
  queue,
  queueItems,
}: {
  queue: Doc<"queues">;
  queueItems: Doc<"queueItems">[];
}) {
  return (
    <div className="container mx-auto max-w-7xl mt-12">
      <MemberQueueCard queue={queue} people={queueItems} />
      <MemberQueueActionBar queue={queue} />
    </div>
  )
}