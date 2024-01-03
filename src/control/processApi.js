const fs = require('fs').promises;
const path = require('path');

const urlChave = 'https://db-pubs.vercel.app';
const caminhoArquivo = path.join('views/js/api/data/dados.json');

const obterDados = async () => {
  try {
    const fallbackResponse = await fetch(urlChave);

    if (!fallbackResponse.ok) {
      throw new Error(`Erro ao buscar dados - ${fallbackResponse.status}`);
    }

    const fallbackData = await fallbackResponse.json();
    escreverArquivoJSON(fallbackData, caminhoArquivo)
    return fallbackData;
  } catch (error) {
    console.error('Erro ao buscar ou escrever dados:', error);
    throw error;
  }
};
const escreverArquivoJSON = async (dados, caminhoArquivo) => {
  const jsonData = JSON.stringify(dados, null, 2);

  // Criar o diretório se não existir
  const diretorio = path.dirname(caminhoArquivo);
  await fs.mkdir(diretorio, { recursive: true });

  try {

    await fs.writeFile(caminhoArquivo, jsonData, 'utf8');
    console.log('Arquivo JSON criado/atualizado com sucesso.');
  } catch (error) {
    console.error('Erro ao escrever no arquivo JSON:', error.message);
    throw error;
  }
};

module.exports = obterDados;
