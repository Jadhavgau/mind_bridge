export default function ChatMessage({ text, sender }) {
  const isUser = sender === "user";

  const formatText = (text) => {
    return text.split("\n").map((line, index) => {
      // Heading ( **Title** )
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <div key={index} className="fw-bold mt-2 mb-1">
            {line.replace(/\*\*/g, "")}
          </div>
        );
      }

      // Bullet points
      if (line.startsWith("-") || line.startsWith("•")) {
        return (
          <li key={index} className="ms-3">
            {line.replace(/^[-•]\s*/, "")}
          </li>
        );
      }

      // Empty line
      if (line.trim() === "") {
        return <div key={index} style={{ height: "6px" }} />;
      }

      // Normal text
      return (
        <div key={index}>
          {line}
        </div>
      );
    });
  };

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
            : "bg-white text-dark border"
        }`}
        style={{
          maxWidth: "75%",
          fontSize: "0.95rem",
          lineHeight: "1.6",
        }}
      >
        {sender === "ai" ? <ul className="ps-3 mb-0">{formatText(text)}</ul> : text}
      </div>
    </div>
  );
}



