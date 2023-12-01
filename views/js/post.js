const obterTituloDaURL = () => {
  const currentURL = window.location.href;
  const urlParts = currentURL.split('/');
  const titulo = urlParts[urlParts.length - 1];
  return decodeURIComponent(titulo);
};

// Função para buscar o post na API na cyclic
const buscarPostNaAPI = async (tituloDoPost) => {
  try {

    const response = await fetch('https://dark-gold-dog-yoke.cyclic.app');
    if (!response.ok) {
      throw new Error('Não foi possível obter os dados da API.');
    }

    const data = await response.json();
    const post = data.posts.find(post => post.titulo === tituloDoPost);

    if (post) {

      //  estrutura HTML 
      const body = document.getElementById('container');

      // Criação da estrutura HTML
      const dataPublicacao = document.getElementById("dataPub");
      dataPublicacao.textContent = post.data.substring(0, 10);

      const header = document.getElementById("nomeTitulo");
      header.className = "page-header";
      header.textContent = post.titulo;
      
      const img = document.getElementById("capa");

      if (post.images === null || post.images.trim() === '') {
        img.style.display = 'none'; 
      } else {
        img.style.display = 'block'; 
        img.src = post.images;
      }
      
      img.src = post.images;
      

      const introducaoFormatada = post.introducao
      const desenvolvimentoFormatado = post.desenvolvimento
      const conclusaoFormatada = post.conclusao
      
      
      const introductionSection = criarSecao("section introduction", introducaoFormatada);
      const developmentSection = criarSecao("section development", desenvolvimentoFormatado);
      const conclusionSection = criarSecao("section conclusion", conclusaoFormatada);
      
      //  seções ao corpo da página
      body.insertBefore(conclusionSection, body.firstChild);
      body.insertBefore(developmentSection, body.firstChild);
      body.insertBefore(introductionSection, body.firstChild);

      
      
    } else {
      console.log('Postagem não encontrada');
    }
  } catch (error) {
    console.error(error);
  }
};

// Função auxiliar para criar seção HTML
const criarSecao = (className, conteudo) => {
  const section = document.createElement("section");
  section.className = className;
  const pSection = createElementWithClass("p", "section-content");
  section.appendChild(pSection);
  pSection.innerHTML = sanitizeHTML(formatTextWithAsterisks(conteudo));
  return section;
};

// Função auxiliar para criar elemento com classe
const createElementWithClass = (tag, className, content) => {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = content;
  return element;
};

// Função para formatar o texto com asteriscos, colchetes e hashtags
const formatTextWithAsterisks = (text) => {
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
const sanitizeHTML = (text) => {
  const textWithLineBreaks = text.replace(/\/n/g, '<br>');
  const sanitizedText = textWithLineBreaks.replace(/<(?!\/?(span|article|a|br))[^>]*>/g, '');
  return sanitizedText;
};


// Chama as funções
const tituloDoPost = obterTituloDaURL();
buscarPostNaAPI(tituloDoPost);
