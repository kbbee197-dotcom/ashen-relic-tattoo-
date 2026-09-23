"use client";

import { useState, useEffect } from "react";
import { artists } from "@/data/artists";
import { getOpenSlots, createAppointment } from "@/lib/appointments";
import { formatTime } from "@/lib/formatTime";

export default function BookPage() {
  const [artistId, setArtistId] = useState(artists[0].id);
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!date) {
      setSlots([]);
      return;
    }
    setLoading(true);
    setSelectedSlot("");
    getOpenSlots(artistId, date)
      .then(setSlots)
      .catch(() => setError("Could not load availability. Try again."))
      .finally(() => setLoading(false));
  }, [artistId, date]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!selectedSlot) {
      setError("Please select a time slot.");
      return;
    }
    setLoading(true);
    try {
      const manageToken = await createAppointment({
        artistId,
        date,
        time: selectedSlot,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        description,
      });
      setConfirmation(manageToken);
    } catch (err) {
      setError("Something went wrong booking your appointment. Try again.");
    } finally {
      setLoading(false);
    }
  }

  if (confirmation) {
    return (
      <main className="max-w-xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl mb-4">Appointment Booked</h1>
        <p className="text-stone-100 mb-6">
          You&apos;re all set. Save this link to manage or cancel your
          appointment later:
        </p>
        <p className="card-relic rounded p-4 break-all text-relic-gold">
          {typeof window !== "undefined" ? window.location.origin : ""}
          /manage/{confirmation}
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-xl mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl text-center mb-10">
        Book an Appointment
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <label className="flex flex-col gap-1">
          <span className="text-stone-100">Artist</span>
          <select
            value={artistId}
            onChange={(e) => setArtistId(e.target.value)}
            className="bg-black border border-relic-gold/40 rounded px-3 py-2 text-stone-100"
          >
            {artists.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-stone-100">Date</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-black border border-relic-gold/40 rounded px-3 py-2 text-stone-100"
            required
          />
        </label>

        {date && (
          <div>
            <span className="text-stone-100 block mb-2">Available Times</span>
            {loading && <p className="text-stone-100">Loading...</p>}
            {!loading && slots.length === 0 && (
              <p className="text-stone-100">
                No open slots this day. Try another date.
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {slots.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`px-3 py-2 rounded border ${
                    selectedSlot === slot
                      ? "bg-relic-gold text-black border-relic-gold"
                      : "border-relic-gold/40 text-stone-100"
                  }`}
                >
                  {formatTime(slot)}
                </button>
              ))}
            </div>
          </div>
        )}

        <label className="flex flex-col gap-1">
          <span className="text-stone-100">Your Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-black border border-relic-gold/40 rounded px-3 py-2 text-stone-100"
            required
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-stone-100">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-black border border-relic-gold/40 rounded px-3 py-2 text-stone-100"
            required
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-stone-100">Phone</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-black border border-relic-gold/40 rounded px-3 py-2 text-stone-100"
            required
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-stone-100">Describe What You Want</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-black border border-relic-gold/40 rounded px-3 py-2 text-stone-100"
            rows={4}
          />
        </label>

        {error && <p className="text-blood">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-relic-gold text-black font-semibold px-6 py-3 rounded hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Booking..." : "Confirm Appointment"}
        </button>
      </form>
    </main>
  );
}
