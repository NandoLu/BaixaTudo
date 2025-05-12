import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { styles } from "../styles";

// Função para validar links do YouTube
const isValidYouTubeUrl = (url: string) => {
  const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  return regex.test(url);
};

// Função para enviar o link ao backend
const downloadVideo = async (url: string) => {
  if (!isValidYouTubeUrl(url)) {
    Alert.alert("Erro", "Link inválido! Insira um link válido do YouTube.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();
    Alert.alert("Download", data.message);
  } catch (error) {
    Alert.alert("Erro", "Não foi possível baixar o vídeo!");
  }
};

export default function Index() {
  const [url, setUrl] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#1a1a1a" />
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
    </View>
  );
}
