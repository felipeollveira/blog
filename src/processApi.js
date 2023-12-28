const fs = require('fs').promises;
const path = require('path');

const urlChave = 'https://db-pubs.vercel.app';

const obterDados = async () => {
  try {
    const fallbackResponse = await fetch(urlChave);
    const fallbackData = await fallbackResponse.json();
    
    const caminhoArquivo = path.join(__dirname, 'data/dados.json');

    // Escrever o arquivo JSON com os dados do fallback
    await escreverArquivoJSON(fallbackData, caminhoArquivo);
    //A minha familia nasceu para vencer
    console.log('Arquivo JSON criado com sucesso.');

    return fallbackData;
  } catch (error) {
    console.error('Erro ao buscar ou escrever dados:', error.message);
    throw error;
  }
};

const escreverArquivoJSON = async (dados, caminhoArquivo) => {
  const jsonData = JSON.stringify(dados, null, 2);

  // Criar o diretório se não existir
  const diretorio = path.dirname(caminhoArquivo);
  await fs.mkdir(diretorio, { recursive: true });

  // Escrever o arquivo JSON
  await fs.writeFile(caminhoArquivo, jsonData, 'utf8');
};


module.exports = obterDados;
