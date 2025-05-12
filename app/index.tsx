import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BAIXATUDO</Text>
      <View style={styles.searchContainer}>
        <TextInput style={styles.input} placeholder="Pesquisar..." placeholderTextColor="#fff"/>
        <TouchableOpacity style={styles.button}>
          <MaterialIcons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
