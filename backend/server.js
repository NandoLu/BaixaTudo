import express from "express";
import cors from "cors";
import { exec } from "child_process";
import path from "path"; // Importa 'path' para lidar com caminhos de arquivo, se necessário

const app = express();
app.use(cors()); // Habilita o CORS para permitir requisições de diferentes origens (seu app mobile)
app.use(express.json()); // Permite que o servidor entenda requisições com corpo JSON

// Rota POST para iniciar o download de músicas
app.post("/download", (req, res) => {
  const { url } = req.body; // Extrai a URL do corpo da requisição
  console.log("Recebido link para download:", url); // Log para depuração no servidor

  // Validação básica da URL para garantir que é um link do YouTube válido
  if (!url || !url.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/)) {
    return res.status(400).json({ error: "URL inválida! Por favor, insira um link válido do YouTube." });
  }

  // Define o comando para o yt-dlp
  // -x: extrair apenas o áudio
  // --audio-format mp3: converte o áudio para mp3
  // -o "BaixaTudo/%(title)s.mp3": define o diretório de saída e o formato do nome do arquivo
  //
  // ATENÇÃO: As músicas serão baixadas para o servidor que hospeda este backend (no Render),
  // e NÃO diretamente para o seu celular. Para que elas cheguem ao celular,
  // você precisaria implementar um mecanismo adicional (ex: servidor faz upload para
  // um serviço de armazenamento em nuvem e envia um link de download para o app,
  // ou o servidor serve o arquivo diretamente de volta para o app).
  const command = `python -m yt_dlp -x --audio-format mp3 -o "BaixaTudo/%(title)s.mp3" ${url}`;

  // Executa o comando yt-dlp no sistema operacional do servidor
  exec(command, (error, stdout, stderr) => {
    if (error) {
      // Loga o erro completo para depuração no servidor
      console.error("Erro ao baixar vídeo com yt-dlp:", stderr);
      // Retorna uma mensagem de erro mais útil para o cliente
      return res.status(500).json({ error: "Erro interno no servidor ao baixar a música.", details: stderr });
    }
    // Loga a saída padrão do yt-dlp para depuração
    console.log("Download stdout:", stdout);
    // Retorna uma mensagem de sucesso para o cliente
    res.json({ message: "Download processado no servidor com sucesso!", output: stdout });
  });
});

// Define a porta em que o servidor irá escutar.
// process.env.PORT é usado por muitos serviços de hospedagem para especificar a porta.
const PORT = process.env.PORT || 3000;
// Define o host como '0.0.0.0' para que o servidor escute em todas as interfaces de rede
const HOST = '0.0.0.0';

// Inicia o servidor, escutando na porta e no host especificados
app.listen(PORT, HOST, () => console.log(`✅ Servidor Express rodando em http://${HOST}:${PORT}`));
