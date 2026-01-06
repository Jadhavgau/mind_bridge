export default function ChatMessage({ text, sender }) {
  const isUser = sender === "user";

  return (
    <div
      className={`d-flex mb-3 ${
        isUser ? "justify-content-end" : "justify-content-start"
      }`}
    >
      <div
        className={`px-3 py-2 rounded-4 shadow-sm ${
          isUser
            ? "bg-primary-subtle text-primary"
            : "bg-white text-dark border border-light"
        }`}
        style={{
          maxWidth: "70%",
          fontSize: "0.95rem",
          lineHeight: "1.5",
        }}
      >
        {text}
      </div>
    </div>
  );
}


