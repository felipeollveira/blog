const root = document.getElementById('root');
const noPostsContainer = document.getElementById('casenopost');
const onePostContainer = document.getElementById('caseOnepost');
const assigneValueSelect = document.getElementById('dropdown');

const apiurl = 'https://db-pubs.vercel.app/';

// Funções auxiliares
const quebrarTexto = (texto, comprimentoLinha = 30) => texto.match(new RegExp(`.{1,${comprimentoLinha}}`, 'g')).join('\n');
const truncarTexto = (texto, maxLength = 156) => texto.length <= maxLength ? texto : texto.substring(0, maxLength) + '...';
const calcularTempoLeitura = (texto) => {
    const palavras = texto.split(/\s+/).length;
    const tempoLeituraMinutos = palavras / 200;
    return tempoLeituraMinutos < 1 ? 'Menos de 1 minuto' : `${Math.ceil(tempoLeituraMinutos)} minutos`;
};

const criarInfoItem = (label, value) => {
    const infoItem = document.createElement('div');
    infoItem.className = 'cr';
    infoItem.innerHTML = `<p class="dt">${label}</p><p class="dd">${value}</p>`;
    return infoItem;
};

const criarPostElement = (post) => {
    const { titulo, introducao, desenvolvimento, conclusao, data, imagem, autor, _id } = post;
    const dataFormatada = new Date(data).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' });

    const card = document.createElement('div');
    card.className = 'card';

    const header = document.createElement('div');
    header.className = 'header';

    const titleLink = document.createElement('a');
    titleLink.className = 'title';
    titleLink.href = `/${autor}/${titulo}/${_id}`; // Link com o ID do post
    titleLink.textContent = quebrarTexto(titulo) + " ↵ ";
    header.appendChild(titleLink);

    if (imagem) {
        const imageContainer = document.createElement('span');
        imageContainer.className = 'caseImage';
        const postImage = document.createElement('img');
        postImage.className = 'image';
        postImage.src = imagem;
        postImage.alt = titulo;
        postImage.onerror = () => postImage.style.display = 'none';
        imageContainer.appendChild(postImage);
        header.appendChild(imageContainer);
    }

    card.appendChild(header);

    const description = document.createElement('p');
    description.className = 'description';
    description.textContent = truncarTexto(introducao);
    card.appendChild(description);

    const postInfo = document.createElement('div');
    postInfo.className = 'post-info';
    postInfo.append(
        criarInfoItem('Publicado', dataFormatada),
        criarInfoItem('Tempo de leitura', calcularTempoLeitura(introducao + desenvolvimento + conclusao)),
        criarInfoItem('Autor', autor)
    );
    card.appendChild(postInfo);

    return card;
};

const fetchData = async () => {
    const cacheName = 'data-cache';
    const cache = await caches.open(cacheName);
    let data;

    try {
        const cachedResponse = await cache.match(apiurl);
        if (cachedResponse) {
            data = await cachedResponse.json();
            console.log('Dados do cache usados');
        } else {
            console.log('Buscando dados da API');
            const response = await fetch(apiurl);
            if (!response.ok) {
                throw new Error(`Erro de rede - ${response.status}`);
            }
            data = await response.json();
            const responseToCache = response.clone();
            cache.put(apiurl, responseToCache);
        }
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return null;
    }

    return data;
};

const showNoPosts = (assigne) => {
    noPostsContainer.style.display = 'flex';
    onePostContainer.style.display = 'none';

    let noPostsMessage = document.getElementById('noPostsMessage');

    if (!noPostsMessage) {
        noPostsMessage = document.createElement('h2');
        noPostsMessage.id = 'noPostsMessage';
        noPostsContainer.appendChild(noPostsMessage);
    }

    noPostsMessage.textContent = assigne === 'All' ? 'Não há posts disponíveis.' : `Não há posts disponíveis para ${assigne}.`;
};

const renderPosts = (posts, assigne = 'All') => {
    root.innerHTML = '';

    const filteredPosts = assigne === 'All' ? posts : posts.filter(post => post.autor.toLowerCase() === assigne.toLowerCase());

    if (filteredPosts.length === 0) {
        showNoPosts(assigne);
    } else if (filteredPosts.length === 1) {
        onePostContainer.style.display = 'block';
        noPostsContainer.style.display = 'none';
        onePostContainer.appendChild(criarPostElement(filteredPosts[0]));
    } else {
        // hideNoPosts(); //  Não é necessário chamar hideNoPosts aqui, pois o root.innerHTML = '' já remove a mensagem.
          noPostsContainer.style.display = 'none' // isso resolve
        filteredPosts.forEach(post => {
            const postElement = criarPostElement(post);
            root.appendChild(postElement);
        });
    }
};


const getAndRenderPosts = async (assigne) => {
    try {
        const data = await fetchData();
        if (data && data.posts) {
            renderPosts(data.posts, assigne);
        } else {
            showNoPosts('All');
        }
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        showNoPosts(assigne);
    }
};

assigneValueSelect.addEventListener('change', () => {
  const selectedAssigne = assigneValueSelect.value || 'All';
  getAndRenderPosts(selectedAssigne);


  //const urlParams = new URLSearchParams(window.location.search);
  if (selectedAssigne === 'All') {
      urlParams.delete('assigne');
  } else {
      //urlParams.set('assigne', selectedAssigne);
  }
  const newUrl = window.location.pathname + '?' + urlParams.toString();
  window.history.replaceState({}, '', newUrl);
});


const init = async () => {
  const assigneValue = new URLSearchParams(window.location.search).get('assigne') || 'All';
  await getAndRenderPosts(assigneValue);

  // Configuração do Select com os autores (após buscar os dados)
  const data = await fetchData();
  if (data && data.posts) {
      const autores = new Set(data.posts.map(post => post.autor)); // Obtém autores únicos
      autores.forEach(autor => {
          const option = document.createElement('option');
          option.value = autor;
          option.textContent = autor;
          assigneValueSelect.appendChild(option);
      });
  }

};


init();