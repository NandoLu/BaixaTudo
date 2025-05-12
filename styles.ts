import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212", // Fundo mais elegante
    padding: 20,
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
    textTransform: "uppercase", // Deixa em letras maiúsculas automaticamente
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e1e1e", // Fundo mais suave para a barra de pesquisa
    borderRadius: 30,
    paddingHorizontal: 10,
    elevation: 5, // Sombras no Android
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
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
    transform: [{ scale: 1.1 }], // Deixa o ícone levemente maior
  },
});
