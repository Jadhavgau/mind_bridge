export default function ChatMessage({ text, sender }) {
  const isUser = sender === "user";

  // ⭐ STAR / MARKDOWN CLEANING (MAIN FIX)
  const cleanText = text
    .replace(/\*\*/g, "")   // remove **
    .replace(/\*/g, "")     // remove *
    .replace(/###/g, "")    // remove ###
    .replace(/##/g, "")
    .replace(/#/g, "");

  const paragraphs = cleanText.split("\n").filter(p => p.trim() !== "");

  return (
    <div
      className={`d-flex mb-3 ${
        isUser ? "justify-content-end" : "justify-content-start"
      }`}
    >
      <div
        className={`px-3 py-3 rounded-4 shadow-sm ${
          isUser
            ? "bg-primary-subtle text-primary"
            : "bg-white text-dark border"
        }`}
        style={{
          maxWidth: "75%",
          fontSize: "0.95rem",
          lineHeight: "1.6",
        }}
      >
        {paragraphs.map((p, i) => (
          <p key={i} style={{ marginBottom: "8px" }}>
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
