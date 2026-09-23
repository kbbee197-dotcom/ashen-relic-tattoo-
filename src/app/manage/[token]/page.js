"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  findAppointmentByToken,
  cancelAppointment,
  rescheduleAppointment,
  getOpenSlots,
} from "@/lib/appointments";
import { artists } from "@/data/artists";
import { formatTime } from "@/lib/formatTime";

export default function ManagePage() {
  const { token } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("view");
  const [newDate, setNewDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");

  useEffect(() => {
    findAppointmentByToken(token)
      .then((appt) => {
        if (!appt) {
          setError("Appointment not found.");
        } else {
          setAppointment(appt);
        }
      })
      .catch(() => setError("Something went wrong loading your appointment."))
      .finally(() => setLoading(false));
  }, [token]);

  useEffect(() => {
    if (!newDate || !appointment) {
      setSlots([]);
      return;
    }
    getOpenSlots(appointment.artistId, newDate).then(setSlots);
  }, [newDate, appointment]);

  async function handleCancel() {
    if (!confirm("Cancel this appointment?")) return;
    setLoading(true);
    try {
      await cancelAppointment(appointment.id);
      setAppointment({ ...appointment, status: "cancelled" });
    } catch {
      setError("Could not cancel. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleReschedule() {
    if (!selectedSlot) {
      setError("Please select a new time slot.");
      return;
    }
    setLoading(true);
    try {
      await rescheduleAppointment(appointment.id, newDate, selectedSlot);
      setAppointment({ ...appointment, date: newDate, time: selectedSlot });
      setMode("view");
    } catch {
      setError("Could not reschedule. Try again.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="max-w-xl mx-auto px-4 py-16 text-center">
        <p className="text-stone-100">Loading...</p>
      </main>
    );
  }

  if (error && !appointment) {
    return (
      <main className="max-w-xl mx-auto px-4 py-16 text-center">
        <p className="text-blood">{error}</p>
      </main>
    );
  }

  const artist = artists.find((a) => a.id === appointment.artistId);

  return (
    <main className="max-w-xl mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl text-center mb-10">
        Manage Your Appointment
      </h1>

      <div className="card-relic rounded-lg p-6 mb-8">
        <p className="text-stone-100 mb-2">
          Artist: <span className="text-relic-gold">{artist?.name}</span>
        </p>
        <p className="text-stone-100 mb-2">Date: {appointment.date}</p>
        <p className="text-stone-100 mb-2">Time: {formatTime(appointment.time)}</p>
        <p className="text-stone-100">
          Status:{" "}
          <span
            className={
              appointment.status === "cancelled"
                ? "text-blood"
                : "text-relic-gold"
            }
          >
            {appointment.status}
          </span>
        </p>
      </div>

      {appointment.status === "confirmed" && mode === "view" && (
        <div className="flex flex-col gap-4">
          <button
            onClick={() => setMode("reschedule")}
            className="border border-relic-gold text-relic-gold px-6 py-3 rounded hover:bg-relic-gold hover:text-black transition"
          >
            Reschedule
          </button>
          <button
            onClick={handleCancel}
            className="border border-blood text-blood px-6 py-3 rounded hover:bg-blood hover:text-white transition"
          >
            Cancel Appointment
          </button>
        </div>
      )}

      {mode === "reschedule" && (
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-stone-100">New Date</span>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="bg-black border border-relic-gold/40 rounded px-3 py-2 text-stone-100"
            />
          </label>

          {newDate && (
            <div className="flex flex-wrap gap-2">
              {slots.map((slot) => (
                <button
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
          )}

          {error && <p className="text-blood">{error}</p>}

          <button
            onClick={handleReschedule}
            className="bg-relic-gold text-black font-semibold px-6 py-3 rounded hover:opacity-90 transition"
          >
            Confirm New Time
          </button>
        </div>
      )}
    </main>
  );
}
