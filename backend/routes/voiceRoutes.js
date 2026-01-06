import express from "express";
import multer from "multer";

const router = express.Router();
const upload = multer();

router.post("/", upload.single("audio"), async (req, res) => {
  try {
    const audioBuffer = req.file.buffer;

    const response = await fetch(
      `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_TRANSCRIBE}/audio/transcriptions?api-version=${process.env.AZURE_OPENAI_API_VERSION}`,
      {
        method: "POST",
        headers: {
          "api-key": process.env.AZURE_OPENAI_KEY,
          "Content-Type": "audio/webm", 
        },
        body: audioBuffer
      }
    );

    const data = await response.json();
    res.json({ transcription: data.text || "" });
  } catch (err) {
    console.error("Azure Transcribe Error:", err);
    res.json({ transcription: "" });
  }
});

export default router;
