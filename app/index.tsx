import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar"; // Usando o StatusBar do Expo
import { styles } from "../styles";

export default function Index() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#1a1a1a" />
      <Image source={require("../assets/images/BaixaTudoLogo.png")} style={styles.logo} />
      <Text style={styles.title}>BAIXATUDO</Text>
      <View style={styles.searchContainer}>
        <TextInput style={styles.input} placeholder="Pesquisar..." placeholderTextColor="#fff"/>
        <TouchableOpacity style={styles.button} activeOpacity={0.7}>
          <MaterialIcons name="search" size={26} color="#121212" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
