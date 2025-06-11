import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Constants from 'expo-constants'; // Importa Constants para obter a altura da barra de status

import { styles } from "../styles"; // Estilos globais do aplicativo
import CustomModal from "../components/customModal";

// Função para validar links do YouTube
const isValidYouTubeUrl = (url: string) => {
  const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
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
   * @param {string} url - O link do YouTube a ser baixado.
   */
  const downloadVideo = async (url: string) => {
    const serverUrl = "http://192.168.1.234:3000/download"; // Altere para seu IP local

    // Valida o link do YouTube antes de enviar ao backend
    if (!isValidYouTubeUrl(url)) {
      showModal("Link inválido! Insira um link válido do YouTube.");
      return;
    }

    try {
      // Faz a requisição POST para o backend
      const response = await fetch(serverUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      // Analisa a resposta JSON do backend
      const data = await response.json();
      showModal(data.message); // Exibe a mensagem de sucesso/erro do download no modal
    } catch (error) {
      console.log("Erro ao tentar baixar:", error);
      showModal("Não foi possível baixar a música!"); // Exibe mensagem de erro no modal em caso de falha na requisição
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ height: Constants.statusBarHeight, backgroundColor: '#1a1a1a', width: '100%', position: 'absolute', top: 0, zIndex: 1 }} />
      <StatusBar style="light" />

      <Image source={require("../assets/images/BaixaTudoLogo.png")} style={styles.logo} />
      <Text style={styles.title}>BAIXATUDO</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Cole um link do YouTube..."
          placeholderTextColor="#aaa"
          value={url}
          onChangeText={setUrl}
        />
        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => downloadVideo(url)}>
          <MaterialIcons name="download" size={26} color="#121212" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>

      <CustomModal visible={isModalVisible} message={modalMessage} onClose={hideModal} />
    </View>
  );
}
