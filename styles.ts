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
    borderColor: "#7ed957", // Cor principal
    borderRadius: 10, // Bordas arredondadas
    paddingVertical: 12, // Aumentando a altura
    paddingHorizontal: 16, // Ajustando o tamanho horizontal
    width: 250, // Tornando maior
    backgroundColor: "#333", // Fundo escuro do input
    color: "#fff", // Texto branco para visibilidade
  },
  button: {
    backgroundColor: "#7ed957", // Cor principal
    paddingVertical: 12, // Igual ao input
    paddingHorizontal: 16, // Ajustando tamanho
    borderRadius: 10, // Bordas arredondadas
  },
  text: {
    color: "#7ed957", // Cor principal
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
