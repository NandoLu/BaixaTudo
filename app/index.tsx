// index.tsx (apenas o trecho do KeyboardAvoidingView)
import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

import { styles } from "../styles";
import CustomModal from "../components/customModal";

const isValidYouTubeUrl = (url: string) => {
  const regex = /^(https?:\/\/)?(www\.|m\.)?(youtube\.com|youtu\.be)\/.+$/;
  return regex.test(url);
};

const screenHeight = Dimensions.get("window").height;

export default function Index() {
  const [url, setUrl] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const showModal = (message: string) => {
    setModalMessage(message);
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
    setModalMessage("");
  };

  const downloadVideo = async (rawUrl: string) => {
    const serverUrl = "https://baixatudo-backend.onrender.com/download";
    const cleanedUrl = rawUrl.trim();

    console.log("URL limpa para validação:", cleanedUrl);
    console.log(
      "Resultado da validação (isValidYouTubeUrl):",
      isValidYouTubeUrl(cleanedUrl)
    );

    if (!isValidYouTubeUrl(cleanedUrl)) {
      showModal("Link inválido! Insira um link válido do YouTube.");
      return;
    }

    try {
      const response = await fetch(serverUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: cleanedUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro desconhecido do servidor.");
      }

      const data = await response.json();
      showModal(data.message);
    } catch (error: unknown) {
      console.log("Erro ao tentar baixar:", error);
      let errorMessage = "Não foi possível baixar a música!";

      if (error instanceof Error) {
        errorMessage = `Não foi possível baixar a música! Erro: ${error.message}`;
      } else if (typeof error === "string") {
        errorMessage = `Não foi possível baixar a música! Erro: ${error}`;
      } else {
        errorMessage =
          "Não foi possível baixar a música! Verifique sua conexão ou a URL do servidor.";
      }
      showModal(errorMessage);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#121212" }}
      behavior={Platform.OS === "ios" ? "padding" : "position"}
      keyboardVerticalOffset={
        Platform.OS === "ios" ? Constants.statusBarHeight :
        // AJUSTE AQUI PARA O ANDROID
        Platform.select({
            android: -240, // Tente este valor primeiro. Ajuste conforme necessário.
            default: 0 // Valor padrão para outras plataformas (ex: web, se aplicável)
        })
      }
    >
      {/* View para o fundo da StatusBar - Mantenha como está */}
      <View
        style={{
          height: Constants.statusBarHeight,
          backgroundColor: "#1a1a1a",
          width: "100%",
          position: "absolute",
          top: 0,
          zIndex: 1,
        }}
      />
      <StatusBar style="light" />

      {/* Envolva o conteúdo principal em uma ScrollView */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingBottom: 20,
          minHeight:
            screenHeight - (Platform.OS === "ios" ? Constants.statusBarHeight : 0),
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentWrapper}>
          {/* Logotipo do aplicativo */}
          <Image
            source={require("../assets/images/BaixaTudoLogo.png")}
            style={styles.logo}
          />
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
              onChangeText={setUrl}
            />
            {/* Botão de download */}
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={() => downloadVideo(url)}
            >
              <MaterialIcons
                name="download"
                size={26}
                color="#121212"
                style={styles.buttonIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Renderiza o modal personalizado */}
      <CustomModal
        visible={isModalVisible}
        message={modalMessage}
        onClose={hideModal}
      />
    </KeyboardAvoidingView>
  );
}