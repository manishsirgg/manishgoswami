import { EMAIL, SESSION, WHATSAPP } from "./site.ts";

export type ConsultationRequest = {
  name: string;
  email: string;
  focus: string;
  date: string;
  time: string;
};

export function localDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function preferredInstant(request: ConsultationRequest): Date | null {
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(request.date) ||
    !/^\d{2}:\d{2}$/.test(request.time)
  )
    return null;
  const instant = new Date(`${request.date}T${request.time}:00`);
  // Reject impossible calendar dates and times skipped by a daylight-saving transition.
  if (
    Number.isNaN(instant.getTime()) ||
    localDate(instant) !== request.date ||
    `${String(instant.getHours()).padStart(2, "0")}:${String(instant.getMinutes()).padStart(2, "0")}` !==
      request.time
  )
    return null;
  return instant;
}

export function validateRequest(
  request: ConsultationRequest,
  focuses: string[],
  now = new Date(),
): string {
  if (
    request.name.trim().length < 2 ||
    request.name.length > 100 ||
    /[\r\n]/.test(request.name)
  )
    return "Please enter a name between 2 and 100 characters.";
  if (
    request.email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(request.email)
  )
    return "Please enter a valid email address.";
  if (!focuses.includes(request.focus))
    return "Please choose one of the consultation areas.";
  const instant = preferredInstant(request);
  if (!instant)
    return "Choose a valid date and time. A clock-change hour may be unavailable in your timezone.";
  if (instant <= now)
    return "Please choose a preferred date and time in the future.";
  return "";
}

export function requestMessage(
  request: ConsultationRequest,
  timezone: string,
  campaign = "",
) {
  const instant = preferredInstant(request);
  if (!instant) throw new Error("Invalid preferred time");
  const offset = -instant.getTimezoneOffset();
  const utcOffset = `${offset >= 0 ? "+" : "-"}${String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0")}:${String(Math.abs(offset) % 60).padStart(2, "0")}`;
  return [
    "Consultation request — availability not confirmed",
    `Name: ${request.name.trim()}`,
    `Email: ${request.email.trim()}`,
    `Focus: ${request.focus}`,
    `Preferred time: ${request.date} ${request.time} (${timezone}, UTC${utcOffset})`,
    `UTC instant: ${instant.toISOString()}`,
    `Session: ${SESSION.minutes} minutes on ${SESSION.platform}; fee ₹${SESSION.fee.toLocaleString("en-IN")} ${SESSION.currency}.`,
    "Please check availability and let me know the next steps and payment instructions. No appointment or payment has been confirmed.",
    campaign ? `Campaign (shared with my permission): ${campaign}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}
export function handoffLinks(message: string) {
  return {
    whatsapp: `https://wa.me/${WHATSAPP.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`,
    email: `mailto:${EMAIL}?subject=${encodeURIComponent("Consultation request — Manish Goswami")}&body=${encodeURIComponent(message)}`,
  };
}
