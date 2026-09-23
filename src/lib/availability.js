import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { defaultAvailability } from "@/data/availability";

export async function getArtistAvailability(artistId) {
  const ref = doc(db, "availability", artistId);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return snap.data().schedule;
  }
  return defaultAvailability;
}

export async function setArtistAvailability(artistId, schedule) {
  const ref = doc(db, "availability", artistId);
  await setDoc(ref, { schedule });
}
