import { useState } from "react";

function ChatInput({ onSend }) {
  const [text, setText] = useState("");

  return (
    <div className="card-footer d-flex gap-2">
      <input
        className="form-control"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your thoughts…"
        onKeyDown={(e) => e.key === "Enter" && onSend(text, setText)}
      />
      <button className="btn btn-primary" onClick={() => onSend(text, setText)}>
        Send
      </button>
    </div>
  );
}

export default ChatInput;
