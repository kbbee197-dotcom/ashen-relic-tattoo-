"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { artists } from "@/data/artists";
import { getArtistAvailability, setArtistAvailability } from "@/lib/availability";

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function AvailabilityAdminPage() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [artistId, setArtistId] = useState(artists[0].id);
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setCheckingAuth(false);
      if (!u) router.push("/admin/login");
    });
    return unsub;
  }, [router]);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getArtistAvailability(artistId)
      .then(setSchedule)
      .finally(() => setLoading(false));
  }, [user, artistId]);

  function toggleDay(dayIndex) {
    setSchedule((prev) => {
      const next = { ...prev };
      if (next[dayIndex]) {
        delete next[dayIndex];
      } else {
        next[dayIndex] = { open: "11:00", close: "22:00" };
      }
      return next;
    });
  }

  function updateTime(dayIndex, field, value) {
    setSchedule((prev) => ({
      ...prev,
      [dayIndex]: { ...prev[dayIndex], [field]: value },
    }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      await setArtistAvailability(artistId, schedule);
      alert("Availability saved.");
    } catch {
      alert("Could not save. Try again.");
    } finally {
      setSaving(false);
    }
  }

  if (checkingAuth || !user) {
    return (
      <main className="max-w-xl mx-auto px-4 py-16 text-center">
        <p className="text-stone-100">Checking access...</p>
      </main>
    );
  }

  return (
    <main className="max-w-xl mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl text-center mb-10">
        Artist Availability
      </h1>

      <label className="flex flex-col gap-1 mb-8">
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

      {loading ? (
        <p className="text-stone-100">Loading...</p>
      ) : (
        <div className="flex flex-col gap-4">
          {dayLabels.map((label, i) => (
            <div key={i} className="card-relic rounded-lg p-4 flex flex-col gap-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={!!schedule[i]}
                  onChange={() => toggleDay(i)}
                />
                <span className="text-stone-100">{label}</span>
              </label>
              {schedule[i] && (
                <div className="flex gap-3 items-center pl-7">
                  <input
                    type="time"
                    value={schedule[i].open}
                    onChange={(e) => updateTime(i, "open", e.target.value)}
                    className="bg-black border border-relic-gold/40 rounded px-2 py-1 text-stone-100"
                  />
                  <span className="text-stone-100">to</span>
                  <input
                    type="time"
                    value={schedule[i].close}
                    onChange={(e) => updateTime(i, "close", e.target.value)}
                    className="bg-black border border-relic-gold/40 rounded px-2 py-1 text-stone-100"
                  />
                </div>
              )}
            </div>
          ))}

          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-relic-gold text-black font-semibold px-6 py-3 rounded hover:opacity-90 transition disabled:opacity-50 mt-4"
          >
            {saving ? "Saving..." : "Save Availability"}
          </button>
        </div>
      )}
    </main>
  );
}
