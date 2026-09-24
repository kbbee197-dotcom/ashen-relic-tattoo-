"use client";

import { useState, useRef, useEffect } from "react";

export default function ChatBubble() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi, I'm Ashen! Ask me about hours, pricing, booking, or aftercare." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open && (
        <div className="mb-3 w-80 max-w-[90vw] h-96 card-relic rounded-lg flex flex-col overflow-hidden bg-black">
          <div className="px-4 py-3 border-b border-relic-gold/30 flex justify-between items-center">
            <span className="text-relic-gold font-display">Ashen</span>
            <button onClick={() => setOpen(false)} className="text-stone-100">
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "self-end bg-relic-gold text-black rounded px-3 py-2 max-w-[85%]"
                    : "self-start bg-stone-800 text-stone-100 rounded px-3 py-2 max-w-[85%]"
                }
              >
                {m.content}
              </div>
            ))}
            {loading && <div className="self-start text-stone-100 text-sm">Ashen is typing...</div>}
            <div ref={endRef} />
          </div>
          <form onSubmit={sendMessage} className="flex border-t border-relic-gold/30">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 bg-black px-3 py-2 text-stone-100 focus:outline-none"
            />
            <button type="submit" className="px-4 text-relic-gold">
              Send
            </button>
          </form>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="bg-relic-gold text-black rounded-full w-14 h-14 flex items-center justify-center shadow-lg font-display text-lg"
      >
        A
      </button>
    </div>
  );
}
