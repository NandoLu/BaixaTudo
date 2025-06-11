import express from "express";
import cors from "cors";
import { exec } from "child_process";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

// Rota POST para iniciar o download de músicas
app.post("/download", (req, res) => {
  const { url } = req.body;
  console.log("Recebido link para download (backend):", url); // Log para depuração no servidor Render

  // ATENÇÃO: Esta é a regex CRÍTICA! Ela precisa incluir 'm.'
  if (!url || !url.match(/^(https?:\/\/)?(www\.|m\.)?(youtube\.com|youtu\.be)\/.+$/)) {
    console.error("Validação de URL no backend falhou para:", url); // Log mais específico para depuração
    return res.status(400).json({ error: "URL inválida! Por favor, insira um link válido do YouTube." });
  }

  // Define o comando para o yt-dlp
  const command = `python -m yt_dlp -x --audio-format mp3 -o "BaixaTudo/%(title)s.mp3" ${url}`;

  // Executa o comando yt-dlp no sistema operacional do servidor
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("Erro ao baixar vídeo com yt-dlp:", stderr);
      return res.status(500).json({ error: "Erro interno no servidor ao baixar a música.", details: stderr });
    }
    console.log("Download stdout:", stdout);
    res.json({ message: "Download processado no servidor com sucesso!", output: stdout });
  });
});

// Define a porta em que o servidor irá escutar, usando process.env.PORT do Render
const PORT = process.env.PORT || 3000;
// Define o host como '0.0.0.0' para que o servidor escute em todas as interfaces de rede
const HOST = '0.0.0.0';

// Inicia o servidor, escutando na porta e no host especificados
app.listen(PORT, HOST, () => console.log(`✅ Servidor Express rodando em http://${HOST}:${PORT}`));
