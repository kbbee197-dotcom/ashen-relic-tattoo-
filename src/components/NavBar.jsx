import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/flash", label: "Flash & Pricing" },
  { href: "/artists", label: "Artists" },
  { href: "/book", label: "Book Now" },
  { href: "/contact", label: "Contact" },
];

export default function NavBar() {
  return (
    <header className="w-full px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-relic-gold/20">
      <Link href="/" className="font-display text-xl text-bone">
        Ashen Relic
      </Link>
      <nav className="flex flex-wrap items-center justify-center gap-4 text-sm">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-stone-100 hover:text-relic-gold transition"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-4 text-sm">
        <a
          href="https://www.tiktok.com/@ashen.relic.tatto"
          target="_blank"
          rel="noopener noreferrer"
          className="text-stone-100 hover:text-relic-gold transition"
        >
          TikTok
        </a>
        <a
          href="https://www.facebook.com/share/18M9iCkphS/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-stone-100 hover:text-relic-gold transition"
        >
          Facebook
        </a>
      </div>
    </header>
  );
}
