export function detectEmotion(text) {
  const t = text.toLowerCase();

  if (t.includes("tired") || t.includes("exhausted") || t.includes("done")) {
    return "overwhelmed";
  }

  if (t.includes("sad") || t.includes("cry") || t.includes("lonely")) {
    return "sad";
  }

  if (t.includes("anxious") || t.includes("worried") || t.includes("panic")) {
    return "anxious";
  }

  if (t.includes("angry") || t.includes("frustrated") || t.includes("mad")) {
    return "angry";
  }

  return "neutral";
}
