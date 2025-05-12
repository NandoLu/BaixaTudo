import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a", // Fundo escuro
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#c1ff72", // Cor principal
    borderRadius: 5,
    padding: 8,
    width: 200,
    backgroundColor: "#333", // Fundo escuro do input
    color: "#fff", // Texto branco para visibilidade
  },
  button: {
    backgroundColor: "#c1ff72", // Cor principal
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: "#c1ff72", // Cor principal
    fontSize: 18,
    fontWeight: "bold",
  },
  title:{
    fontSize: 32,
    fontWeight: "bold", // Deixando em negrito para mais destaque
    color: "#fff", // Cor branca
    textAlign: "center", // Centralizando o texto
    marginBottom: 20, // Espaço extra abaixo do título
  },
  logo: {
    width: 150, // Defina o tamanho da imagem
    height: 150,
    resizeMode: "contain", // Mantém a proporção da imagem
    marginBottom: 20, // Espaço abaixo da logo
    borderRadius: 15,
  },
});
