

const urlApi = 'https://db-pubs.vercel.app';
const cacheName = 'data-cache';
const urlJson = './data/dados.json'


const fetchAndCacheData = async () => {
  try {
    // Limpar a cache existente
    await limparCache();

    // Abrir um novo cache
    const cache = await caches.open(cacheName);

    // Verificar se os dados já estão no cache
    const cachedResponse = await cache.match(new Request(urlApi));

    if (cachedResponse) {
      const data = await cachedResponse.json();
      console.log('Dados recuperados do cache (data-cache).');
      return data;
    }

    // Se os dados não estão no cache, buscar da API
    const response = await fetch(urlApi);

    if (!response.ok) {
      throw new Error(`Erro ao buscar dados - ${response.status}`);
    }

    // Converter a resposta em JSON
    const data = await response.json();

    // Armazenar a resposta da API no cache
    await cache.put(new Request(urlApi), new Response(JSON.stringify(data)));

    console.log('Dados da API armazenados no cache (data-cache) com sucesso.');
    return data;
  } catch (error) {
    console.error('Erro ao buscar ou armazenar dados:', error.message);
    throw error;
  }
};

// Função para limpar a cache
const limparCache = async () => {
  try {
    const cache = await caches.open(cacheName);
    await cache.delete(urlApi);
    console.log('Cache limpa com sucesso.');
  } catch (error) {
    console.error('Erro ao limpar o cache:', error);
  }
};

// Chama a função para buscar e armazenar dados
fetchAndCacheData();

