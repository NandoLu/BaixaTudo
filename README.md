BaixaTudo
Um aplicativo móvel para baixar o áudio (MP3) de vídeos do YouTube. Ele é construído com Expo (React Native) para o frontend e um Node.js Express para o backend, utilizando a poderosa ferramenta yt-dlp para o download de áudio e o Cloudinary para o armazenamento e entrega dos arquivos.

🚀 Arquitetura do Projeto
O projeto BaixaTudo é dividido em duas partes principais:

Frontend (Aplicativo Móvel): Desenvolvido com Expo e React Native, provendo uma interface de usuário intuitiva para o usuário interagir.

Backend (Servidor): Um servidor Node.js Express que lida com a lógica de download. Ele recebe a URL do YouTube do frontend, utiliza o yt-dlp para extrair o áudio e, em seguida, faz o upload do arquivo MP3 resultante para o Cloudinary, retornando a URL do download para o aplicativo.

Armazenamento de Mídia: Cloudinary é usado para armazenar os arquivos MP3 baixados, garantindo que eles sejam acessíveis publicamente e possam ser baixados pelo aplicativo móvel.

✨ Funcionalidades
Download de áudio (MP3) de vídeos do YouTube.

Interface de usuário otimizada para dispositivos móveis.

Backend hospedado na nuvem (Render), permitindo que o aplicativo funcione independentemente do seu computador local.

Gestão de downloads de áudio via Cloudinary.

⚙️ Pré-requisitos (Desenvolvimento Local)
Para configurar e rodar o projeto localmente, você precisará ter o seguinte instalado:

Node.js (versão 20 ou superior) e npm (gerenciador de pacotes do Node.js).

Git

Python 3 (versão 3.8 ou superior).

pip (gerenciador de pacotes do Python, geralmente vem com o Python).

Expo Go app no seu celular (para testar o frontend) ou um emulador/simulador de Android/iOS.

Uma conta no Cloudinary (para obter as credenciais de API).

💻 Configuração e Execução Local
Siga os passos abaixo para configurar e rodar o projeto no seu ambiente de desenvolvimento.

1. Clonar o Repositório
Primeiro, clone o repositório para o seu computador:

git clone https://github.com/NandoLu/BaixaTudo.git
cd BaixaTudo

2. Configuração do Frontend (Aplicativo Expo)
Navegue até o diretório raiz do projeto (onde está o package.json principal):

# Certifique-se de estar no diretório raiz do projeto BaixaTudo
# C:\Users\luizf\Projetos\BaixaTudo
npm install

3. Configuração do Backend (Servidor Node.js)
Navegue até o diretório backend:

cd backend
npm install

Em seguida, instale a ferramenta yt-dlp usando pip:

pip install yt-dlp

4. Configuração do Cloudinary (para Desenvolvimento Local)
Para que o backend possa fazer o upload para o Cloudinary, você precisará das suas credenciais.

Crie uma conta gratuita no Cloudinary.

No seu Dashboard do Cloudinary, anote seu Cloud Name, API Key e API Secret.

Para testar localmente, você pode definir essas variáveis de ambiente diretamente no seu terminal antes de iniciar o servidor, ou usar um arquivo .env (o que exigiria uma biblioteca como dotenv no seu server.js).

Exemplo para terminal (apenas para a sessão atual):

export CLOUDINARY_CLOUD_NAME="seu_cloud_name"
export CLOUDINARY_API_KEY="sua_api_key"
export CLOUDINARY_API_SECRET="seu_api_secret"

5. Executando o Projeto Localmente
Abra dois terminais separados.

Terminal 1: Iniciar o Backend
Navegue até a pasta backend e inicie o servidor:

cd BaixaTudo/backend
npm start
# Você deve ver: ✅ Servidor Express rodando na porta 3000

Terminal 2: Iniciar o Frontend
Navegue até a pasta raiz do projeto e inicie o aplicativo Expo:

cd BaixaTudo
npx expo start --clear

Isso abrirá uma nova aba no seu navegador com o Metro Bundler. Use o aplicativo Expo Go no seu celular para escanear o QR code e abrir o aplicativo.

Observação: Durante o desenvolvimento local, o serverUrl no app/index.tsx deve apontar para o seu IP local. Se você o alterou para a URL do Render, volte para http://<SEU_IP_LOCAL>:3000/download para testes locais. Por exemplo: http://192.168.1.234:3000/download.

☁️ Deploy na Nuvem (Render & Cloudinary)
Para que seu aplicativo funcione independentemente do seu computador, o backend precisa ser implantado em um serviço de hospedagem na nuvem.

1. Configurar Variáveis de Ambiente do Cloudinary no Render
Suas credenciais do Cloudinary NÃO devem ser armazenadas no seu código-fonte. Adicione-as como Variáveis de Ambiente no Render:

Acesse o Dashboard do Render e vá para o seu serviço de backend (baixatudo-backend).

No painel lateral esquerdo, clique em "Environment".

Adicione as seguintes variáveis, substituindo pelos seus valores reais:

CLOUDINARY_CLOUD_NAME: [Seu Cloud Name do Cloudinary]

CLOUDINARY_API_KEY: [Sua API Key do Cloudinary]

CLOUDINARY_API_SECRET: [Seu API Secret do Cloudinary]

2. Configurar o Serviço Web no Render
Conecte seu Repositório Git: No Render, crie um novo "Web Service" e conecte-o ao seu repositório GitHub (NandoLu/BaixaTudo).

Configurações do Serviço:

Name: baixatudo-backend (ou outro nome único)

Root Directory: backend (importante!)

Region: Escolha a região mais próxima de você.

Branch: main (ou dev, se você a configurou no Render para monitorar a dev).

Runtime: Node.js

Build Command: pip install yt-dlp && npm install

Start Command: node server.js

Plan Type: Free (para começar).

Deploy: Após configurar, o Render iniciará o deploy automaticamente. Monitore os logs no dashboard do Render.

Após um deploy bem-sucedido, o Render fornecerá a URL pública do seu backend (ex: https://baixatudo-backend.onrender.com).

3. Atualizar a URL do Backend no Frontend
Com a URL pública do seu backend no Render em mãos, você precisa atualizar o serverUrl no seu aplicativo Expo:

Abra o arquivo app/index.tsx.

Localize a linha const serverUrl = "http://192.168.1.234:3000/download";

Substitua-a pela URL do seu serviço Render:

const serverUrl = "https://baixatudo-backend.onrender.com/download";

Salve o arquivo.

Faça o commit e push desta alteração para o seu repositório GitHub na branch que o Render monitora (main ou dev).

📱 Como Usar o Aplicativo
Inicie o aplicativo BaixaTudo no seu dispositivo (via Expo Go ou APK gerado).

Copie um link de vídeo do YouTube (certifique-se de que não há espaços extras no início ou no fim).

Cole o link no campo de texto do aplicativo.

Clique no botão de download.

O aplicativo enviará a URL para o seu backend no Render, que processará o download e o upload para o Cloudinary, retornando a URL do arquivo MP3 para o seu aplicativo.

Observação Importante: Atualmente, o backend apenas notifica que o "Download foi processado no servidor". Para que o arquivo MP3 seja efetivamente baixado para o seu celular e salvo na sua biblioteca de mídia, você precisaria implementar um passo adicional no frontend para:

Receber a downloadUrl do backend.

Usar expo-file-system para baixar o arquivo da downloadUrl para o armazenamento local do dispositivo.

Opcionalmente, usar expo-media-library para adicionar o arquivo à biblioteca de músicas do seu celular.

📁 Estrutura do Projeto
BaixaTudo/
├── app/                  # Código do aplicativo Expo (frontend)
│   ├── index.tsx         # Componente principal da tela inicial
│   ├── _layout.tsx       # Layout de navegação do Expo Router
├── assets/               # Imagens e outros ativos estáticos
├── backend/              # Código do servidor Node.js (backend)
│   ├── server.js         # Lógica principal do servidor
│   └── package.json      # Dependências do backend (express, cors, cloudinary)
├── components/           # Componentes React Native reutilizáveis
│   └── CustomModal.tsx   # Componente de modal personalizado
├── node_modules/         # Dependências do Node.js (frontend)
├── package.json          # Dependências e scripts do projeto (frontend)
├── package-lock.json     # Bloqueio de versão de dependências
├── metro.config.cjs      # Configuração do Metro Bundler (ignora a pasta backend)
├── styles.ts             # Estilos compartilhados entre componentes
└── tsconfig.json         # Configurações TypeScript

Sinta-se à vontade para fazer mais perguntas ou sugerir melhorias!