"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getAllAppointments, cancelAppointment } from "@/lib/appointments";
import { formatTime } from "@/lib/formatTime";
import { artists } from "@/data/artists";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
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
    getAllAppointments()
      .then(setAppointments)
      .finally(() => setLoading(false));
  }, [user]);

  async function handleCancel(id) {
    if (!confirm("Cancel this appointment?")) return;
    await cancelAppointment(id);
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "cancelled" } : a))
    );
  }

  function artistName(id) {
    return artists.find((a) => a.id === id)?.name || id;
  }

  if (checkingAuth || !user) {
    return (
      <main className="max-w-xl mx-auto px-4 py-16 text-center">
        <p className="text-stone-100">Checking access...</p>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl md:text-4xl">Admin Dashboard</h1>
        <button
          onClick={() => signOut(auth)}
          className="text-relic-gold hover:underline"
        >
          Sign Out
        </button>
      </div>

      {loading && <p className="text-stone-100">Loading appointments...</p>}

      {!loading && appointments.length === 0 && (
        <p className="text-stone-100">No appointments yet.</p>
      )}

      <div className="flex flex-col gap-4">
        {appointments.map((a) => (
          <div key={a.id} className="card-relic rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div>
                <p className="text-stone-100">
                  <span className="text-relic-gold">{a.date}</span> at{" "}
                  {formatTime(a.time)} with {artistName(a.artistId)}
                </p>
                <p className="text-stone-100">
                  {a.customerName} - {a.customerEmail} - {a.customerPhone}
                </p>
                {a.description && (
                  <p className="text-stone-100 text-sm mt-1">
                    &quot;{a.description}&quot;
                  </p>
                )}
                <p
                  className={
                    a.status === "cancelled"
                      ? "text-blood text-sm mt-1"
                      : "text-relic-gold text-sm mt-1"
                  }
                >
                  {a.status}
                </p>
              </div>
              {a.status === "confirmed" && (
                <button
                  onClick={() => handleCancel(a.id)}
                  className="border border-blood text-blood px-4 py-2 rounded hover:bg-blood hover:text-white transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
