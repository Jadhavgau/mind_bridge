import { useState, useRef } from "react";
import ChatMessage from "./ChatMessages";
import Loader from "./Loader";
import { sendMessage } from "../services/api";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const recognitionRef = useRef(null);

  const startRecording = () => {
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;

    recognition.onresult = (e) => {
      setText(e.results[0][0].transcript);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const handleSend = async () => {
    if (!text.trim()) return;

    const userMsg = { text, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setText("");
    setLoading(true);

    try {
      const data = await sendMessage(userMsg.text);
      setMessages((prev) => [...prev, { text: data.reply, sender: "ai" }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { text: "I’m here with you. Please try again.", sender: "ai" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="flex-grow-1 overflow-auto px-3 py-2 bg-light"
        style={{ height: "100%" }}
      >
        {messages.map((m, i) => (
          <ChatMessage key={i} text={m.text} sender={m.sender} />
        ))}
        {loading && <Loader />}
      </div>

      <div className="border-top bg-white p-2">
        <div className="input-group">
          <input
            className="form-control border-0 shadow-sm rounded-pill px-3"
            placeholder="Share what's on your mind…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={loading}
          />

          <button
            className="btn btn-outline-secondary rounded-circle ms-2"
            onClick={startRecording}
            title="Speak"
          >
            🎤
          </button>

          <button
            className="btn btn-success rounded-pill ms-2 px-4"
            onClick={handleSend}
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}



