import Link from "next/link";
import { artists } from "@/data/artists";

export default function ArtistsPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl text-center mb-4">Our Artists</h1>
      <p className="text-center text-stone-100 mb-12 max-w-2xl mx-auto">
        Meet the artists behind the work.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artists.map((artist) => (
          <div key={artist.id} className="card-relic rounded-lg p-6 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-stone-800 border border-relic-gold/40 mb-4 flex items-center justify-center text-3xl text-relic-gold">
              {artist.name.charAt(0)}
            </div>
            <h2 className="text-xl mb-1">{artist.name}</h2>
            <p className="text-relic-gold text-sm mb-3">{artist.specialty}</p>
            <p className="text-stone-100 text-sm mb-6">{artist.bio}</p>
            <Link
              href={`/book?artist=${artist.id}`}
              className="mt-auto border border-relic-gold text-relic-gold px-4 py-2 rounded hover:bg-relic-gold hover:text-black transition"
            >
              Book with {artist.name}
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
