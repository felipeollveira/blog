const root = document.getElementById('root');
const noPosts = document.getElementById('casenopost');
const onePost = document.getElementById('caseOnepost')
const footer = document.querySelector('footer');

const urlChave = ' https://dark-gold-dog-yoke.cyclic.app';

// API
const fetchCards = async () => {
    const cache = await caches.open('data-cache');

    try{
    const cachedResponse = await cache.match(urlChave);
  
    if (!cachedResponse) {
      throw new Error('Não foi possível obter os dados do cache.');
    }
  
    const data = await cachedResponse.json();
    return data;
  } catch (error) {
    console.error('Error fetching data from the API:', error);
    throw error;
  }
};

const renderPost = (post) => {
  const {
    post_id: id,
    titulo,
    introducao,
    data: postData,
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
  spanImage.className = 'image';
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

fetchCards()
  .then(data => {
    if (data.posts.length === 0) {
      noPosts.style.display = 'flex'

      if (data.posts.length === 1) {
        onePost.style.width = '500px';
        not_post.style.display = 'none';
        onePost.style.display = 'flex'
      }

    } else {
        noPosts.display = 'none';
      for (const post of data.posts) {
        renderPost(post);
      }

    }
  })
  .catch(error => {
    console.error(error);
  });
