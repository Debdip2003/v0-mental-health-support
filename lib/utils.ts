import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generates a persistent-looking random user ID
// Prefer crypto.randomUUID when available; fall back to timestamp + random
export function generateUserId(): string {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      // Use a shorter, user-friendly form by trimming
      const uuid = (crypto as any).randomUUID() as string;
      return `user_${uuid.split("-")[0]}${uuid.split("-")[1]}`;
    }
  } catch {
    // ignore and fallback
  }
  const randomPart = Math.random().toString(36).slice(2, 8);
  const timePart = Date.now().toString(36);
  return `user_${timePart}${randomPart}`;
}
