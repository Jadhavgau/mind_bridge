import React, { useState } from "react";

export default function VoiceInput({ onSend }) {
  const [recording, setRecording] = useState(false);
  const [text, setText] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const handleStart = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    const chunks = [];

    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.onstop = async () => {
      const blob = new Blob(chunks, { type: "audio/webm" });
      // Call backend / transcribe API
      const formData = new FormData();
      formData.append("file", blob, "voice.webm");

      const res = await fetch("http://localhost:3000/api/transcribe", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      setText(data.transcription || "");
    };

    recorder.start();
    setMediaRecorder(recorder);
    setRecording(true);
  };

  const handleStop = () => {
    mediaRecorder.stop();
    setRecording(false);
  };

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="d-flex gap-2 mb-2">
      <input
        type="text"
        className="form-control"
        placeholder="Type or speak your message…"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      {!recording ? (
        <button className="btn btn-success" onClick={handleStart}>
          🎤 Speak
        </button>
      ) : (
        <button className="btn btn-danger" onClick={handleStop}>
          ⏹ Stop
        </button>
      )}
      <button className="btn btn-primary" onClick={handleSend}>
        Send
      </button>
    </div>
  );
}
