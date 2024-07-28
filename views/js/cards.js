const root = document.getElementById('root');
const noPosts = document.getElementById('casenopost');
const onePost = document.getElementById('caseOnepost');
const iconLayout = document.getElementById('icon-layout')

const apiurl = 'https://db-pubs.vercel.app';


let rotationAngle = 0; 


function grid() {
/*
    setTimeout(() => {
         root.style.gridTemplateColumns = (root.style.gridTemplateColumns === 'auto') ? 'auto auto' : 'auto';
        setTimeout(() => {

            rotationAngle += 90;
            iconLayout.style.transform = `rotateZ(${rotationAngle}deg)`;
        }, 50);
    }, 200);
*/
    
}



const fetchCards = async () => {
  try {
    const cache = await caches.open('data-cache');
    const cachedResponse = await cache.match(apiurl);

    let data = cachedResponse ? await cachedResponse.json() : undefined;

    if (data === undefined) {
        throw new Error('Fallback');
    }
    
    return data;
  } catch (error) {
    // segunda opcao: buscar na api
    try {
      const fallbackResponse = await fetch(apiurl);
      
      if (fallbackResponse.ok) {
        const fallbackData = await fallbackResponse.json();

        const modifiedFallbackData = {
          ...fallbackData,
        };
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
    desenvolvimento,
    conclusao,
    data: postData,
    imagem,
    autor
  } = post;


  const dataFormat = postData.substring(0, 4);

  const divCard = document.createElement('div');
  divCard.className = 'card';
  divCard.setAttribute('id','cardWidth')

  const divHeader = document.createElement('div');
  divHeader.className = 'header';

  const aTitle = document.createElement('a');
  aTitle.className = 'title';
  aTitle.href = '#';
  

  function quebrarTexto(titulo) {
    const lines = [];
  
    for (let i = 0; i < titulo.length; i += 30) {
      lines.push(titulo.slice(i, i + 30));
    }
  
    return lines.join('\n');
  }

  const tituloQuebrado = quebrarTexto(titulo);
  aTitle.textContent = tituloQuebrado;


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

  

  
  imagemCard.onerror = function() {
    imagemCard.style.display = 'none';
  };  
  
  imagemCard.src = imagem
  imagemCard.setAttribute('alt',aTitle.textContent)
  spanImage.appendChild(imagemCard)
  }

  



  divHeader.appendChild(spanImage);

  divCard.appendChild(divHeader);

  const pDescription = document.createElement('p');
  pDescription.className = 'description';

  const maxLength = 156


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

//LOGICA PARA TEMPO DE LEITURA
//uma pessoa lê aproximadamente 200 a 250 palavras por minuto

const totalCaracteres = introducao.length + desenvolvimento.length + conclusao.length;
const palavrasPorMinuto = 200;
const caracteresPorPalavra = 5;

const palavras = totalCaracteres / caracteresPorPalavra;
const tempoDeLeituraEmMinutos = palavras / palavrasPorMinuto;

let tempoLeitura = 0;

tempoDeLeituraEmMinutos.toFixed(2) < 1 ? tempoLeitura = 'Menos de 1' : tempoLeitura = parseFloat(tempoDeLeituraEmMinutos.toFixed());


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
      body: JSON.stringify({ titulo, autor, dataFormat}),
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

