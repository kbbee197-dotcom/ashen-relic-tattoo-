import { NextResponse } from "next/server";
import { flashBoards, flashSheets } from "@/data/flash";

const SYSTEM_PROMPT = `You are Ashen, the friendly virtual assistant for Ashen Relic Tattoo Studio & Art Gallery in Charleston, WV.

Shop info:
- Address: 1829 Bigley Ave, Charleston, WV 25302
- Phone: (304) 768-6468
- Email: tripleatatt@gmail.com
- Hours: Wednesday - Sunday, 11am - 10pm
- Appointments can be booked directly on this website at /book
- Walk-ins are welcome

Flash & Pricing available:
${flashBoards.map((b) => `- ${b.title}: ${b.price}`).join("\n")}
${flashSheets.map((s) => `- ${s.title}: ${s.price}`).join("\n")}

Answer questions about the shop, booking, tattoo aftercare basics, and pricing. Keep answers short and friendly. If you don't know something specific (like a particular artist's personal schedule), suggest they call the shop or use the Book Now page. Never make up prices not listed above.`;

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't process that.";

    return NextResponse.json({ reply });
  } catch (err) {
    return NextResponse.json({ reply: "Something went wrong. Please try again." }, { status: 500 });
  }
}
