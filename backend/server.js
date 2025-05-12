import express from "express";
import { exec } from "child_process";

const app = express();
app.use(express.json());

app.post("/download", (req, res) => {
  const { url } = req.body;

  if (!url.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/)) {
    return res.status(400).json({ error: "URL inválida!" });
  }

  const command = `yt-dlp -f bestvideo+bestaudio ${url} -o "video.mp4"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: "Erro ao baixar vídeo!" });
    }
    res.json({ message: "Download concluído!", output: stdout });
  });
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
