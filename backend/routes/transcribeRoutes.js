import express from "express";
import multer from "multer";
import fs from "fs";
import FormData from "form-data";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No audio file received" });
    }

    const formData = new FormData();
    formData.append(
      "file",
      fs.createReadStream(req.file.path),
      "audio.webm"
    );
    formData.append("model", "gpt-4o-transcribe");

    const response = await fetch(
      `${process.env.AZURE_OPENAI_ENDPOINT}/openai/audio/transcriptions?api-version=2024-12-01-preview`,
      {
        method: "POST",
        headers: {
          "api-key": process.env.AZURE_OPENAI_KEY,
          ...formData.getHeaders(),
        },
        body: formData,
      }
    );

    const data = await response.json();

    fs.unlinkSync(req.file.path);

    if (data.error) {
      console.error("Azure Transcribe Error:", data.error);
      return res.status(500).json({ error: "Transcription failed" });
    }

    res.json({ transcription: data.text });

  } catch (err) {
    console.error("Transcription server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;