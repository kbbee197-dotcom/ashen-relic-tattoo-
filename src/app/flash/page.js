import Image from "next/image";
import Link from "next/link";
import { flashBoards, flashSheets } from "@/data/flash";

function FlashCard({ item }) {
  return (
    <div className="card-relic rounded-lg overflow-hidden flex flex-col">
      <div className="relative w-full aspect-[3/4]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="text-lg font-display text-bone">{item.title}</h3>
        <p className="text-relic-gold font-semibold">{item.price}</p>
        <Link
          href={`/book?design=${item.id}`}
          className="mt-auto inline-block text-center border border-relic-gold text-relic-gold px-4 py-2 rounded hover:bg-relic-gold hover:text-black transition"
        >
          Book This Design
        </Link>
      </div>
    </div>
  );
}

export default function FlashPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl text-center mb-4">
        Flash &amp; Pricing
      </h1>
      <p className="text-center text-stone-300 mb-12 max-w-2xl mx-auto">
        Ready-to-tattoo designs at set prices. Pick one and book your
        appointment directly.
      </p>

      <h2 className="text-2xl mb-6 text-relic-gold">Featured Boards</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {flashBoards.map((item) => (
          <FlashCard key={item.id} item={item} />
        ))}
      </div>

      <h2 className="text-2xl mb-6 text-relic-gold">Flash Sheets</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {flashSheets.map((item) => (
          <FlashCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
