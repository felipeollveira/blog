
const urlChave = 'https://db-pubs-felipeollveiras-projects.vercel.app';

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
