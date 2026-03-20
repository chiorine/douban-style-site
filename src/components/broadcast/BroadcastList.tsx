import type { Broadcast } from "@/data/broadcasts";
import BroadcastCard from "./BroadcastCard";

type BroadcastListProps = {
  items: Broadcast[];
};

export default function BroadcastList({ items }: BroadcastListProps) {
  return (
    <section className="rounded-md border border-stone-200 bg-white">
      <div className="divide-y divide-stone-200">
        {items.map((item) => (
          <BroadcastCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}