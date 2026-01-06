import express from "express";
import { getAIResponse } from "../Openai.js";
import { detectEmotion } from "../utils/emotionUtils.js";
import { getReflection } from "../utils/reflectionUtils.js";
import { checkContentSafety } from "../utils/contentSafety.js";

const router = express.Router();

const sessions = {};

router.post("/", async (req, res) => {
  try {
    const { message, sessionId = "mindbridge-session" } = req.body;

    if (!message) {
      return res.json({ reply: "I’m here. What’s on your mind?" });
    }

    if (!sessions[sessionId]) {
      sessions[sessionId] = [];
    }
    const safetyResult = await checkContentSafety(message);

if (safetyResult.isHarmful) {
  const safeReply =
    "I’m really glad you reached out. What you’re feeling matters. \n\n" +
    "If you’re in immediate danger, please contact local emergency services or a trusted person right now.\n\n" +
    "MindBridge supports reflection and emotional awareness — it does not replace professional or medical help.\n\n" +
    "I’m here to listen. What has been hurting you the most lately?";

  sessions[sessionId].push({ role: "user", content: message });
  sessions[sessionId].push({ role: "assistant", content: safeReply });

  return res.json({ reply: safeReply });
}

    const emotion = detectEmotion(message);
    const reflection = getReflection(emotion);

    sessions[sessionId].push({ role: "user", content: message });

    const memory = sessions[sessionId].slice(-12);

    let reply = await getAIResponse(memory);

    if (reflection) {
      reply += `\n\n ${reflection}`;
    }

    sessions[sessionId].push({ role: "assistant", content: reply });

    return res.json({ reply });

  } catch (err) {
    console.error("Chat error:", err);
    return res.json({
      reply: "I’m here with you. Something went wrong, but you’re not alone."
    });
  }
});

export default router;
