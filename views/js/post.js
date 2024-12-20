// Constantes para URLs
const urlApi = 'https://db-pubs.vercel.app';
const urlDadosJson = '../../src/data/dados.json';


// Função para obter o título da URL
const obterIdDaURL = () => {
  const urlAtual = new URL(window.location.href);
  const partesUrl = urlAtual.pathname.split('/'); // Usa o pathname para pegar o caminho sem os parâmetros de consulta
  return partesUrl[partesUrl.length - 1]; // Retorna o último segmento após a última barra
};



// Função para buscar dados do post na API
const buscarPostNaAPI = async (IdDoPost) => {
  
  try {
    const cache = await caches.open('data-cache');
    const cachedResponse = await cache.match(urlApi);

    let dados = cachedResponse ? await cachedResponse.json() : null;

    const post = dados.posts.find(post => post._id === IdDoPost);

    if (!post) {
      console.error(`Post com ID '${IdDoPost}' não encontrado.`);
      throw new Error(`Post com ID '${IdDoPost}' não encontrado.`);
    }
    console.log(post)
    return post;

  } catch (erro) {
    console.log('Ativando fallback:', erro)
      // Tentativa de fallback para outra fonte de dados
    try {
      const [respostaFallback, dadosFallback] = await Promise.all([
        fetch(urlApi),
        fetch(urlApi).then(resposta => resposta.json())
      ]);

      if (!respostaFallback.ok) {
        throw new Error(`Erro de rede - ${respostaFallback.status}`);
      }

     const post = dadosFallback.posts.find(post => post.titulo === tituloDoPost);
  

      if (!post) {
        throw new Error(`Post com título '${tituloDoPost}' não encontrado no fallback.`);
      }
      
      return post;
    } catch (erroFallback) {
      console.error('Erro no fallback:', erroFallback.message);
      throw erroFallback;
    }
  }
};

// Função para renderizar o conteúdo do post
const renderizarPost = (post) => {
  const { titulo, introducao, data: dataPostagem, imagem, desenvolvimento, conclusao } = post;

  // Elementos HTML
  const corpoPagina = document.getElementById('container');
  const dataPublicacao = document.getElementById("dataPub");
  const cabecalho = document.getElementById("nomeTitulo");
  const imagemHTML = document.getElementById("capa");

  // Configurar conteúdo e propriedades de exibição
  dataPublicacao.textContent = dataPostagem.substring(0, 10);
  cabecalho.className = "page-header";
  cabecalho.textContent = titulo;

  if (!imagem || imagem.trim() === '') {
    imagemHTML.style.display = 'none';
  } else {
    imagemHTML.style.display = 'block';
  
    imagemHTML.onerror = function() {
      imagemHTML.style.display = 'none';
    };
  
 
    imagemHTML.src = imagem;
  }

  // Formatar e criar seções HTML
  const secaoIntroducao = criarSecao("section introduction", introducao);
  const secaoDesenvolvimento = criarSecao("section development", desenvolvimento);
  const secaoConclusao = criarSecao("section conclusion", conclusao);

  // Adicionar seções ao corpo da página
  corpoPagina.insertBefore(secaoConclusao, corpoPagina.firstChild);
  corpoPagina.insertBefore(secaoDesenvolvimento, corpoPagina.firstChild);
  corpoPagina.insertBefore(secaoIntroducao, corpoPagina.firstChild);
};

// Função auxiliar para criar seção HTML
const criarSecao = (classe, conteudo) => {
  const secao = document.createElement("section");
  secao.className = classe;
  const paragrafo = createElementWithClass("p", "section-content");
  secao.appendChild(paragrafo);
  paragrafo.innerHTML = sanitizarHTML(formatarTextoComAsteriscos(conteudo));
  return secao;
};

// Função auxiliar para criar elemento com classe
const createElementWithClass = (tag, classe, conteudo) => {
  const elemento = document.createElement(tag);
  elemento.className = classe;
  elemento.textContent = conteudo;
  return elemento;
};

// Função para formatar o texto com asteriscos, colchetes e hashtags
const formatarTextoComAsteriscos = (text) => {
  const textSplit = text.split('');
  let formattedText = [text];

  if (textSplit.includes("\n")) {
    formattedText = formattedText.map(text => text.replace(/\n/g, '<br>'));
  }
  if (textSplit.includes('[')) {
    formattedText = formattedText.map(text => text.replace(/\[(.*?)\]/g, '<article class="obs">$1</article>'));
  }

  if (textSplit.includes('#')) {
    formattedText = formattedText.map(text => text.replace(/#(.*?)#/g, `<a href="$1" target="_blank">Clique aqui!</a>`));
  }

  if (textSplit.includes('*')) {
    formattedText = formattedText.map(text => text.replace(/\*(.*?)\*/g, '<span class="strong">$1</span>'));
  }

  const finalFormattedText = formattedText.join('');
  return finalFormattedText;
};

// Função para remover tags HTML não permitidas
const sanitizarHTML = (texto) => {
  const textoComQuebrasDeLinha = texto.replace(/\/n/g, '<br>');
  const textoSanitizado = textoComQuebrasDeLinha.replace(/<(?!\/?(span|article|a|br))[^>]*>/g, '');
  return textoSanitizado;
};

// Execução inicial
const idPub = obterIdDaURL();
buscarPostNaAPI(idPub)
  .then(post => {
    document.getElementById('loading').style.display = 'none';
    if (post) {
      document.body.classList.add('loaded');
      document.getElementById('pub').style.display = 'block';

      renderizarPost(post);
    } else {
      console.error('Os dados do post não foram carregados corretamente.');
    }
  })
  .catch(erro => {
    // Oculta indicador de loading em caso de erro
    document.getElementById('loading').style.display = 'none';
    
    console.error(erro);
  });
