const root = document.getElementById('root');
const noPostsContainer = document.getElementById('casenopost');
const onePostContainer = document.getElementById('caseOnepost');
const assigneValueSelect = document.getElementById('dropdown');
const apiurl = 'https://db-pubs.vercel.app/';

// Funções auxiliares
const quebrarTexto = (texto, comprimentoLinha = 30) => texto.match(new RegExp(`.{1,${comprimentoLinha}}`, 'g')).join('\n');
const truncarTexto = (texto, maxLength = 156) => {
  if (texto.length <= maxLength) {
    return texto; // Retorna o texto original se for menor que o limite
  }

  // Truncando o texto até o limite
  let truncatedText = texto.substring(0, maxLength);

  // Verifica se a última palavra foi cortada e ajusta
  const lastSpaceIndex = truncatedText.lastIndexOf(' ');

  if (lastSpaceIndex > -1) {
    // Retorna o texto truncado até o final da última palavra
    truncatedText = truncatedText.substring(0, lastSpaceIndex);
  }

  return truncatedText + '... '; // Adiciona '...' após o texto truncado
};

const calcularTempoLeitura = (texto) => {
    const palavras = texto.split(/\s+/).length;
    return palavras / 200 < 1 ? 'Menos de 1 minuto' : `${Math.ceil(palavras / 200)} minutos`;
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
    const tituloCodificado = encodeURIComponent(titulo);
    titleLink.href = `/${autor}/${tituloCodificado}/${_id}`;
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

     const click = document.createElement('a');
    click.textContent = "Acesse o post completo";
    click.href = titleLink.href; 
    click.classList.add('veja-mais');

    
    const description = document.createElement('p');
    description.className = 'description';
    

    description.innerHTML = truncarTexto(introducao);  
    description.appendChild(click);  
    
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
        /*
         const cachedResponse = await cache.match(apiurl);
        if (cachedResponse) {
       
            data = await cachedResponse.json();
            console.log('Dados do cache usados');
        } else {
         */
<<<<<<< HEAD
            //console.log('Buscando dados da API');
=======
            console.log('Buscando dados da API');
>>>>>>> c5d7361150cd7acb3ceb69dd1d93657a513d3c08
      
            const response = await fetch(apiurl);
            if (!response.ok) {
                throw new Error(`Erro de rede - ${response.status}`);
            }

            const responseToCache = response.clone(); // Clona a resposta para cache
            data = await response.json();
            cache.put(apiurl, responseToCache); // Coloca os dados no cache
          
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return null;
    }

    return data;
}


const showNoPosts = (assigne) => {
    noPostsContainer.style.display = 'flex';
    let noPostsMessage = document.getElementById('noPostsMessage');
    if (!noPostsMessage) {
        noPostsMessage = document.createElement('h2');
        noPostsMessage.id = 'noPostsMessage';
        noPostsContainer.appendChild(noPostsMessage);
    }

    noPostsMessage.textContent = assigne === 'All' ? 'Não há posts disponíveis.' : '';
};

const renderPosts = (posts, assigne = 'All') => {
    root.innerHTML = '';
    const filteredPosts = assigne === 'All' ? posts : posts.filter(post => post.autor.toLowerCase() === assigne.toLowerCase());

    if (filteredPosts.length === 0) {
        showNoPosts(assigne);
    } else {
        noPostsContainer.style.display = 'none';
        filteredPosts.forEach(post => root.appendChild(criarPostElement(post)));
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

<<<<<<< HEAD
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Adiciona o event listener com debounce
assigneValueSelect.addEventListener('change', debounce(() => {
    const selectedAssigne = assigneValueSelect.value || 'All';
    getAndRenderPosts(selectedAssigne);

=======
assigneValueSelect.addEventListener('change', () => {
    const selectedAssigne = assigneValueSelect.value || 'All';
    getAndRenderPosts(selectedAssigne);

>>>>>>> c5d7361150cd7acb3ceb69dd1d93657a513d3c08
    const urlParams = new URLSearchParams(window.location.search);
    if (selectedAssigne === 'All') {
        urlParams.delete('assigne');
    } else {
        urlParams.set('assigne', selectedAssigne);
    }
    const newUrl = window.location.pathname + '?' + urlParams.toString();
    window.history.replaceState({}, '', newUrl);
<<<<<<< HEAD
}, 900));
=======
});
>>>>>>> c5d7361150cd7acb3ceb69dd1d93657a513d3c08

const init = async () => {
    const assigneValue = new URLSearchParams(window.location.search).get('assigne') || 'All';
    await getAndRenderPosts(assigneValue);
<<<<<<< HEAD

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

        // Set the dropdown value to match the URL parameter (or 'All')
        assigneValueSelect.value = assigneValue;
=======

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
>>>>>>> c5d7361150cd7acb3ceb69dd1d93657a513d3c08
    }
};

init();
