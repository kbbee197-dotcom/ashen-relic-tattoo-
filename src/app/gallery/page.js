import Image from "next/image";

const portfolio = Array.from({ length: 16 }, (_, i) => `/images/portfolio-${i + 1}.jpg`);

export default function GalleryPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl text-center mb-4">Gallery</h1>
      <p className="text-center text-stone-100 mb-12 max-w-2xl mx-auto">
        A look at recent work from the Ashen Relic team.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {portfolio.map((src) => (
          <div key={src} className="relative aspect-square rounded overflow-hidden card-relic">
            <Image src={src} alt="Tattoo work" fill className="object-cover" />
          </div>
        ))}
      </div>
    </main>
  );
}
