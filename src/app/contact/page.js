export default function ContactPage() {
  return (
    <main className="max-w-xl mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl text-center mb-4">Contact Us</h1>
      <p className="text-center text-stone-100 mb-12">
        Questions about a design, a piece in progress, or anything else?
        Send us a message.
      </p>

      <form
        action="https://formsubmit.co/tripleatatt@gmail.com"
        method="POST"
        className="flex flex-col gap-5"
      >
        <input type="hidden" name="_subject" value="New message from Ashen Relic website" />
        <input type="hidden" name="_captcha" value="false" />

        <label className="flex flex-col gap-1">
          <span className="text-stone-100">Name</span>
          <input
            type="text"
            name="name"
            className="bg-black border border-relic-gold/40 rounded px-3 py-2 text-stone-100"
            required
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-stone-100">Email</span>
          <input
            type="email"
            name="email"
            className="bg-black border border-relic-gold/40 rounded px-3 py-2 text-stone-100"
            required
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-stone-100">Message</span>
          <textarea
            name="message"
            rows={5}
            className="bg-black border border-relic-gold/40 rounded px-3 py-2 text-stone-100"
            required
          />
        </label>

        <button
          type="submit"
          className="bg-relic-gold text-black font-semibold px-6 py-3 rounded hover:opacity-90 transition"
        >
          Send Message
        </button>
      </form>
    </main>
  );
}
