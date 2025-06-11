// Este arquivo (metro.config.cjs) deve estar na raiz do seu projeto Expo.

const { getDefaultConfig } = require('expo/metro-config');
const path = require('path'); // Importa o módulo 'path' para manipulação de caminhos

// Obtém a configuração padrão do Metro para um projeto Expo.
const config = getDefaultConfig(__dirname);

// Adiciona a pasta 'backend' à lista de pastas a serem ignoradas pelo Metro Bundler.
// Isso impede que o Metro tente empacotar o código Node.js do seu backend
// junto com o código do seu aplicativo React Native, que são ambientes diferentes.
config.resolver.blockList = [
  // Expressão regular para ignorar todos os arquivos e subdiretórios dentro da pasta 'backend'
  // '.*\\/backend\\/.*' é para Windows, '.*\/backend\/.*' para Linux/macOS.
  // A combinação garante que funcione em ambos.
  /.*[\\\/]backend[\\\/].*/,
];

// Exporta a configuração modificada.
module.exports = config;
