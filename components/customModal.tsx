import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Propriedades esperadas pelo CustomModal
interface CustomModalProps {
  visible: boolean; // Controla a visibilidade do modal
  message: string;  // Conteúdo da mensagem exibida no modal
  onClose: () => void; // Função a ser chamada quando o modal for fechado
}

/**
 * Componente de Modal Personalizado.
 * Exibe uma mensagem em um overlay com um botão de fechar.
 *
 * @param {CustomModalProps} { visible, message, onClose } - Propriedades do modal.
 * @returns {JSX.Element | null} O componente modal se visível, caso contrário null.
 */
const CustomModal: React.FC<CustomModalProps> = ({ visible, message, onClose }) => {
  // Não renderiza o modal se não estiver visível
  if (!visible) return null;

  return (
    // Overlay semitransparente que cobre a tela inteira
    <View style={modalStyles.overlay}>
      <View style={modalStyles.modalContainer}>
        <Text style={modalStyles.modalText}>{message}</Text>
        <TouchableOpacity style={modalStyles.modalButton} onPress={onClose}>
          <Text style={modalStyles.modalButtonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Estilos para o modal personalizado
const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fundo semitransparente para o overlay
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', // Garante que o overlay cubra toda a tela
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000, // Garante que o modal esteja acima de outros elementos
  },
  modalContainer: {
    backgroundColor: '#1e1e1e', // Cor de fundo do corpo do modal
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    elevation: 10, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    width: '80%', // Largura responsiva
    maxWidth: 400, // Largura máxima para telas maiores
  },
  modalText: {
    fontSize: 18,
    color: '#fff', // Cor do texto do modal
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#c1ff72', // Cor do botão do modal
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
  },
  modalButtonText: {
    color: '#121212', // Cor do texto do botão
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomModal;
