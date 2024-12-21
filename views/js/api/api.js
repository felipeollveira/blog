const urlApi = 'https://db-pubs.vercel.app';
const cacheName = 'data-cache';

/*
const fetchData = async () => {
  try {
    await limparCache()
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(new Request(urlApi));

    if (cachedResponse) {
      const data = await cachedResponse.json();
      console.log('Dados recuperados do cache.');
     
      return data;
    }

    const response = await fetch(urlApi);

    if (!response.ok) {
      throw new Error(`Erro ao buscar dados - ${response.status}`);
    }
    const data = await response.json();
    await cache.put(new Request(urlApi), new Response(JSON.stringify(data)));
    
    return data;
  } catch (error) {
    console.error('Erro ao buscar ou armazenar dados:', error.message);
    throw error;
  }
};
*/

// Função para limpar a cache
const limparCache = async () => {
  try {
    const cache = await caches.open(cacheName);
    await cache.delete(urlApi);
    //console.log('Cache limpa com sucesso.');
  } catch (error) {
    console.error('Erro ao limpar o cache:', error);
  }
};


<<<<<<< HEAD
/*
(async () => {
=======
const fetchDataPeriodically = async () => {
>>>>>>> c5d7361150cd7acb3ceb69dd1d93657a513d3c08
  try {
    await fetchData();
    console.log('Dados atualizados com sucesso');
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
<<<<<<< HEAD
})();
*/
=======
};

// Executa imediatamente ao carregar a página
fetchDataPeriodically();

// Define a execução a cada 5 minutos (300.000 milissegundos)
//setInterval(fetchDataPeriodically, 300000); // 300000 ms = 5 minutos

>>>>>>> c5d7361150cd7acb3ceb69dd1d93657a513d3c08

