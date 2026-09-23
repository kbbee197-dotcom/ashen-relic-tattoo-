import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { slotLengthMinutes } from "@/data/availability";
import { getArtistAvailability } from "@/lib/availability";

function generateSlotsForDay(dateStr, schedule) {
  const date = new Date(dateStr + "T00:00:00");
  const dayOfWeek = date.getDay();
  const hours = schedule[dayOfWeek];
  if (!hours) return [];

  const slots = [];
  const [openH, openM] = hours.open.split(":").map(Number);
  const [closeH, closeM] = hours.close.split(":").map(Number);

  let cursor = openH * 60 + openM;
  const end = closeH * 60 + closeM;

  while (cursor + slotLengthMinutes <= end) {
    const h = Math.floor(cursor / 60);
    const m = cursor % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    cursor += slotLengthMinutes;
  }
  return slots;
}

export async function getOpenSlots(artistId, dateStr) {
  const schedule = await getArtistAvailability(artistId);
  const allSlots = generateSlotsForDay(dateStr, schedule);
  if (allSlots.length === 0) return [];

  const q = query(
    collection(db, "appointments"),
    where("artistId", "==", artistId),
    where("date", "==", dateStr),
    where("status", "==", "confirmed")
  );
  const snapshot = await getDocs(q);
  const taken = snapshot.docs.map((d) => d.data().time);

  return allSlots.filter((slot) => !taken.includes(slot));
}

function generateManageToken() {
  return (
    Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
  );
}

export async function createAppointment({
  artistId,
  date,
  time,
  customerName,
  customerEmail,
  customerPhone,
  description,
}) {
  const manageToken = generateManageToken();
  await addDoc(collection(db, "appointments"), {
    artistId,
    date,
    time,
    customerName,
    customerEmail,
    customerPhone,
    description,
    status: "confirmed",
    manageToken,
    createdAt: Timestamp.now(),
  });
  return manageToken;
}

export async function findAppointmentByToken(manageToken) {
  const q = query(
    collection(db, "appointments"),
    where("manageToken", "==", manageToken)
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const docSnap = snapshot.docs[0];
  return { id: docSnap.id, ...docSnap.data() };
}

export async function cancelAppointment(appointmentId) {
  await updateDoc(doc(db, "appointments", appointmentId), {
    status: "cancelled",
  });
}

export async function rescheduleAppointment(appointmentId, newDate, newTime) {
  await updateDoc(doc(db, "appointments", appointmentId), {
    date: newDate,
    time: newTime,
  });
}

export async function getAllAppointments() {
  const snapshot = await getDocs(collection(db, "appointments"));
  return snapshot.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
}
