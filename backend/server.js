import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoute from "./routes/chatRoutes.js";
import voiceRoutes from "./routes/voiceRoutes.js";
import transcribeRoutes from "./routes/transcribeRoutes.js";
import fileUpload from "express-fileupload";

dotenv.config();

const app = express();
app.use(fileUpload());
app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoute);
app.use("/api/voice", voiceRoutes);
app.use("/api/transcribe", transcribeRoutes);

app.listen(3000, () => {
  console.log("✅ Backend running on http://localhost:3000");
});
