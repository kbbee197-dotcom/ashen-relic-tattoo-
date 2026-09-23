import { Cinzel, Cinzel_Decorative } from "next/font/google";
import BackgroundVideo from "@/components/BackgroundVideo";
import NavBar from "@/components/NavBar";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-body",
});

const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-display",
});

export const metadata = {
  title: "Ashen Relic Tattoo Studio & Art Gallery",
  description:
    "Tattoo studio and art gallery in Charleston, WV. Book your appointment online.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${cinzel.variable} ${cinzelDecorative.variable} min-h-screen text-stone-100 antialiased`}
      >
        <BackgroundVideo />
        <NavBar />
        <div className="relative z-0">{children}</div>
      </body>
    </html>
  );
}
