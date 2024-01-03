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

    const fallbackData = await fallbackResponse.json();
    const vAct = fallbackData.posts.version._id.vr;

    escreverArquivoJSON(fallbackData, caminhoArquivo, vAct)
    return fallbackData;
  } catch (error) {
    console.error('Erro ao buscar ou escrever dados:', error);
    throw error;
  }
};



const escreverArquivoJSON = async (dados, caminhoArquivo, vAct) => {
  const jsonData = JSON.stringify(dados, null, 2);

  // Criar o diretório se não existir
  const diretorio = path.dirname(caminhoArquivo);
  await fs.mkdir(diretorio, { recursive: true });


  try {
    if(vNew != vAct){
      await fs.writeFile(caminhoArquivo, jsonData, 'utf8');
      console.log('Arquivo JSON atualizado com sucesso.');
      return 0;
    }
    else{
      console.log('Arquivo JSON já atualizado.');
      return;
    }
    
  } catch (error) {
    console.error('Erro ao escrever no arquivo JSON:', error.message);
    throw error;
  }
};

module.exports = obterDados;
