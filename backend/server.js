import express from "express";
import cors from "cors";
import { exec } from "child_process";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/download", (req, res) => {
  const { url } = req.body;
  console.log("Recebido link:", url); // 🔥 Log para ver se o app enviou o link

  if (!url.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/)) {
    return res.status(400).json({ error: "URL inválida!" });
  }

  const command = `python -m yt_dlp -x --audio-format mp3 -o "BaixaTudo/%(title)s.mp3" ${url}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("Erro ao baixar vídeo:", stderr);
      return res.status(500).json({ error: "Erro ao baixar vídeo!" });
    }
    res.json({ message: "Download concluído!", output: stdout });
  });
});


app.listen(3000, () => console.log("✅ Servidor rodando na porta 3000"));
