import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Constants from 'expo-constants'; // Importa Constants para obter a altura da barra de status

import { styles } from "../styles"; // Estilos globais do aplicativo
import CustomModal from "../components/customModal"; // Importa o componente CustomModal

// Função para validar links do YouTube
const isValidYouTubeUrl = (url: string) => {
  // Ajuste da regex para incluir explicitamente 'm.youtube.com'
  const regex = /^(https?:\/\/)?(www\.|m\.)?(youtube\.com|youtu\.be)\/.+$/;
  return regex.test(url);
};

export default function Index() {
  const [url, setUrl] = useState("");
  // Estados para controlar a visibilidade e mensagem do modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  /**
   * Exibe o modal com uma mensagem específica.
   * @param {string} message - A mensagem a ser exibida no modal.
   */
  const showModal = (message: string) => {
    setModalMessage(message);
    setIsModalVisible(true);
  };

  /**
   * Esconde o modal.
   */
  const hideModal = () => {
    setIsModalVisible(false);
    setModalMessage("");
  };

  /**
   * Função para enviar o link do YouTube ao backend para download.
   * @param {string} rawUrl - O link do YouTube (potencialmente com espaços) a ser baixado.
   */
  const downloadVideo = async (rawUrl: string) => {
    // ATENÇÃO: Esta é a URL do seu backend DEPLOYADO no Render!
    const serverUrl = "https://baixatudo-backend.onrender.com/download";

    // Remove quaisquer espaços em branco do início ou do fim da URL antes de validar
    const cleanedUrl = rawUrl.trim();

    // Log para depuração: verifique o que está sendo passado para a validação
    console.log("URL limpa para validação:", cleanedUrl);
    console.log("Resultado da validação (isValidYouTubeUrl):", isValidYouTubeUrl(cleanedUrl));


    // Valida o link do YouTube antes de enviar ao backend
    if (!isValidYouTubeUrl(cleanedUrl)) {
      showModal("Link inválido! Insira um link válido do YouTube.");
      return;
    }

    try {
      // Faz a requisição POST para o backend
      const response = await fetch(serverUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: cleanedUrl }), // Envia a URL limpa
      });

      // Verifica se a resposta foi bem-sucedida (status 2xx)
      if (!response.ok) {
        const errorData = await response.json();
        // Lança um erro com a mensagem do servidor se a resposta não for OK
        throw new Error(errorData.error || "Erro desconhecido do servidor.");
      }

      // Analisa a resposta JSON do backend
      const data = await response.json();
      showModal(data.message); // Exibe a mensagem de sucesso/erro do download no modal
    } catch (error: unknown) { // Explicitamente tipa 'error' como 'unknown' para melhor segurança
      console.log("Erro ao tentar baixar:", error);
      let errorMessage = "Não foi possível baixar a música!";

      // Verifica se o erro é uma instância de Error para acessar a propriedade 'message'
      if (error instanceof Error) {
        errorMessage = `Não foi possível baixar a música! Erro: ${error.message}`;
      } else if (typeof error === 'string') {
        errorMessage = `Não foi possível baixar a música! Erro: ${error}`;
      } else {
        errorMessage = "Não foi possível baixar a música! Verifique sua conexão ou a URL do servidor.";
      }
      showModal(errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      {/*
        View para o fundo da StatusBar:
        Define a altura da view para a altura da barra de status do dispositivo.
        Aplica a cor de fundo desejada (#1a1a1a).
        Posiciona-a absolutamente no topo para garantir que cubra a área da barra de status.
      */}
      <View style={{ height: Constants.statusBarHeight, backgroundColor: '#1a1a1a', width: '100%', position: 'absolute', top: 0, zIndex: 1 }} />
      {/*
        StatusBar do Expo:
        Agora usada apenas para controlar o estilo do conteúdo (ícones/texto) da barra de status (claro/escuro).
        A propriedade 'backgroundColor' foi removida, pois a View acima já gerencia o fundo.
      */}
      <StatusBar style="light" />

      {/* Logotipo do aplicativo */}
      <Image source={require("../assets/images/BaixaTudoLogo.png")} style={styles.logo} />
      {/* Título do aplicativo */}
      <Text style={styles.title}>BAIXATUDO</Text>

      {/* Contêiner da barra de pesquisa e botão de download */}
      <View style={styles.searchContainer}>
        {/* Campo de entrada de texto para a URL do YouTube */}
        <TextInput
          style={styles.input}
          placeholder="Cole um link do YouTube..."
          placeholderTextColor="#aaa"
          value={url}
          onChangeText={setUrl} // Mantém o estado com a URL bruta (com ou sem espaços)
        />
        {/* Botão de download */}
        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => downloadVideo(url)}>
          <MaterialIcons name="download" size={26} color="#121212" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>

      {/* Renderiza o modal personalizado, visível com base no estado `isModalVisible` */}
      <CustomModal visible={isModalVisible} message={modalMessage} onClose={hideModal} />
    </View>
  );
}
