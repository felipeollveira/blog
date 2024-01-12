const fs = require('fs').promises;

const path = require('path');

const urlChave = 'https://db-pubs.vercel.app';
const caminhoArquivo = path.join('views/js/api/data/dados.json');

let vNew = 0

const obterDados = async () => {
  try {
    const fallbackResponse = await fetch(urlChave);

    if (!fallbackResponse.ok) {
      throw new Error(`Erro ao buscar dados - ${fallbackResponse.status}`);
    }

    const data = await fallbackResponse.json();

    return data;
  } catch (error) {
    console.error('Erro ao buscar ou escrever dados:', error);
    throw error;
  }
};



module.exports = obterDados;
