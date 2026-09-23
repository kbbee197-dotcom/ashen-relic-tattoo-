import Image from "next/image";
import Link from "next/link";

const portfolioPreview = [
  "/images/portfolio-7.jpg",
  "/images/portfolio-11.jpg",
  "/images/portfolio-16.jpg",
  "/images/portfolio-13.jpg",
];

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12 flex flex-col items-center text-center">
<h1 className="text-3xl sm:text-5xl mb-4">
        Ashen Relic Tattoo Studio &amp; Art Gallery
      </h1>
      <p className="text-stone-100 text-lg max-w-xl mb-10">
        Charleston, West Virginia's home for bold ink and dark artistry.
        Walk-ins welcome. Book your appointment online, anytime.
      </p>

      <div className="flex flex-wrap gap-4 justify-center mb-20">
        <Link
          href="/book"
          className="bg-relic-gold text-black font-semibold px-6 py-3 rounded hover:opacity-90 transition"
        >
          Book an Appointment
        </Link>
        <Link
          href="/flash"
          className="border border-relic-gold text-relic-gold px-6 py-3 rounded hover:bg-relic-gold hover:text-black transition"
        >
          View Flash &amp; Pricing
        </Link>
      </div>

      <div className="card-relic rounded-lg p-8 mb-20 max-w-md w-full">
        <h2 className="text-2xl mb-3">Visit Us</h2>
        <p className="text-stone-100">1829 Bigley Ave</p>
        <p className="text-stone-100 mb-4">Charleston, WV 25302</p>
        <p className="text-relic-gold font-semibold">(304) 768-6468</p>
        <p className="text-stone-100 mb-4">tripleatatt@gmail.com</p>
        <p className="text-stone-100">Wed - Sun, 11am - 10pm</p>
      </div>

      <h2 className="text-2xl mb-6">Recent Work</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full mb-8 mt-2">
        {portfolioPreview.map((src) => (
          <div key={src} className="relative aspect-square rounded overflow-hidden">
            <Image src={src} alt="Tattoo work" fill className="object-cover" />
          </div>
        ))}
      </div>
      <Link
        href="/gallery"
        className="text-relic-gold hover:underline mb-4"
      >
        See the full gallery →
      </Link>
    </main>
  );
}
