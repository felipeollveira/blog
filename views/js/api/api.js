const apiUrl = 'https://dark-gold-dog-yoke.cyclic.app';


const buscarnaApi = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao obter dados da API:', error);
    throw error;
  }
};


const atualizaCache = async () => {
  try {
    const jsonData = await buscarnaApi();
    const cache = await caches.open('data-cache');
    await cache.put(apiUrl, new Response(JSON.stringify(jsonData)));


  } catch (error) {
    console.error('erro no cache', error);
  }
};

atualizaCache();