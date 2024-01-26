const root = document.getElementById('root');
const noPosts = document.getElementById('casenopost');
const onePost = document.getElementById('caseOnepost');

const apiurl = 'https://db-pubs.vercel.app';


const fetchCards = async () => {
  try {
    const cache = await caches.open('data-cache');
    const cachedResponse = await cache.match(apiurl);

    let data = cachedResponse ? await cachedResponse.json() : null;
    
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error.message);
   
    // segunda opcao: buscar na api
    try {
      const fallbackResponse = await fetch(apiurl);
      
      if (fallbackResponse.ok) {
        const fallbackData = await fallbackResponse.json();

        const modifiedFallbackData = {
          ...fallbackData,
        };
        console.log('Fallback')
        return modifiedFallbackData;
      } else {
        throw new Error(`Erro de rede - ${fallbackResponse.status}`);
      }
    } catch (fallbackError) {
      console.error('Erro no fallback:', fallbackError.message);
      throw fallbackError;
    }
  }
};



const renderPost = (post) => {
  const {
    titulo,
    introducao,
    data: postData,
    imagem
  } = post;


  const dataFormat = postData.substring(0, 4);

  const divCard = document.createElement('div');
  divCard.className = 'card';

  const divHeader = document.createElement('div');
  divHeader.className = 'header';

  const aTitle = document.createElement('a');
  aTitle.className = 'title';
  aTitle.href = '#';
  aTitle.textContent = titulo;

  const aName = document.createElement('a');
  aName.className = 'name';
  aName.href = 'https://github.com/felipeollveira';
  aName.target = '_blank';
  aName.textContent = '';

  divHeader.appendChild(aTitle);
  divHeader.appendChild(aName);

  const spanImage = document.createElement('span'); 
  spanImage.className = 'caseImage';

  if(imagem){
    let imagemCard = document.createElement('img')
  imagemCard.className = 'image';
  imagemCard.src = imagem
    spanImage.appendChild(imagemCard)
  }

  



  divHeader.appendChild(spanImage);

  divCard.appendChild(divHeader);

  const pDescription = document.createElement('p');
  pDescription.className = 'description';

  const maxLength = 156;

  if (introducao.length > maxLength) {
    const truncatedText = introducao.substring(0, maxLength);
    const lastPeriodIndex = truncatedText.lastIndexOf('.', '!');

    if (lastPeriodIndex !== -1) {
      pDescription.textContent =
        truncatedText.substring(0, lastPeriodIndex + 1) + '..';
    } else pDescription.textContent = truncatedText + '...';
  } else pDescription.textContent = introducao;

  divCard.appendChild(pDescription);

  const dlPostInfo = document.createElement('div');
  dlPostInfo.className = 'post-info';

  const divPublished = document.createElement('div');
  divPublished.className = 'cr';

  const dtPublished = document.createElement('p');
  dtPublished.className = 'dt';
  dtPublished.textContent = 'Publicado';

  const ddPublished = document.createElement('p');
  ddPublished.className = 'dd';
  ddPublished.textContent = postData.replace('-', '/').substring(0, 7);

  divPublished.appendChild(dtPublished);
  divPublished.appendChild(ddPublished);

  const divReadingTime = document.createElement('div');
  divReadingTime.className = 'cr';

  const dtReadingTime = document.createElement('p');
  dtReadingTime.className = 'dt';
  dtReadingTime.textContent = 'Tempo de leitura';

  const tempoLeitura = 5;

  const ddReadingTime = document.createElement('p');
  ddReadingTime.className = 'dd';
  ddReadingTime.textContent = tempoLeitura + ' minutos';

  divReadingTime.appendChild(dtReadingTime);
  divReadingTime.appendChild(ddReadingTime);

  dlPostInfo.appendChild(divPublished);
  dlPostInfo.appendChild(divReadingTime);

  divCard.appendChild(dlPostInfo);

  root.appendChild(divCard);

  divHeader.onclick = function () {
    fetch('/', {
      method: 'POST',
      body: JSON.stringify({ titulo, dataFormat }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          window.location.href = response.url;
        } else {
          console.error('Error sending request:', response.status);
        }
      })
      .catch(error => {
        console.error('Error sending request:', error);
      });
  };
};

const showNoPosts = () => {
  noPosts.style.display = 'flex';
};



const hideNoPosts = () => {
  noPosts.style.display = 'none';
};

const renderPosts = (posts) => {
  for (const post of posts) {
      renderPost(post);
   
  }
};

fetchCards()
  .then(data => {
    const { posts } = data;

    if (posts.length === 0) {
      showNoPosts();
    } 
    else {
      hideNoPosts();
      renderPosts(posts);
    }
  })
  .catch(error => {
    console.error('Erro ao buscar dados:', error.message);
  });

