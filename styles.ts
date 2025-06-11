import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  scrollContentContainer: {
    flexGrow: 1, // Essencial: faz o conteúdo da ScrollView ocupar o espaço disponível
    justifyContent: "center", // Centraliza o conteúdo verticalmente
    alignItems: "center", // Centraliza o conteúdo horizontalmente
    paddingHorizontal: 20,
    paddingBottom: 20, // Reative o paddingBottom aqui para o espaçamento
  },
  contentWrapper: {
    flex: 1, // Importante: permite que este wrapper se expanda e centralize seu conteúdo
    justifyContent: "center", // Centraliza o conteúdo verticalmente dentro do wrapper
    alignItems: "center", // Centraliza o conteúdo horizontalmente dentro do wrapper
    width: "100%", // Ocupa a largura total da ScrollView
  },
  logo: {
    width: 160,
    height: 160,
    resizeMode: "contain",
    marginBottom: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#c1ff72",
    textAlign: "center",
    marginBottom: 20,
    textTransform: "uppercase",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    borderRadius: 30,
    paddingHorizontal: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    width: "100%",
    maxWidth: 400,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  button: {
    backgroundColor: "#c1ff72",
    padding: 12,
    borderRadius: 30,
  },
  buttonIcon: {
    transform: [{ scale: 1.1 }],
  },
});