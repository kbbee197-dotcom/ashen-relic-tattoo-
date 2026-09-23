// Default weekly availability per artist. 0=Sun ... 6=Sat.
// Matches shop hours (Wed-Sun, 11am-10pm) for every artist by default.
// Edit per-artist hours here anytime.
export const defaultAvailability = {
  0: { open: "11:00", close: "22:00" }, // Sun
  3: { open: "11:00", close: "22:00" }, // Wed
  4: { open: "11:00", close: "22:00" }, // Thu
  5: { open: "11:00", close: "22:00" }, // Fri
  6: { open: "11:00", close: "22:00" }, // Sat
};

export const slotLengthMinutes = 60;
