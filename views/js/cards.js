const root = document.getElementById('root');
const not_post = document.getElementById('no-post')
const footer = document.querySelector('footer')


fetch('https://lovely-worm-tux.cyclic.app/api')
  .then(response => {
    if (!response.ok) {
      throw new Error('Não foi possível obter os dados da API.');
    }
    return response.json();
  })
  .then(data => { 
    
    //console.log(data.posts);

  if(data.posts.length != 0){ 
    for (const post of data.posts) {
  
        let id = post.post_id
        let titulo = post.titulo
        let assunto = post.assunto
        let conclusao = post.conclusao
        let data = post.data
        let autor = post.autor
        let introducao = post.introducao


const dataFormat = data.substring(0,4)//4 primeiros digitos (o ano)

let divCard = document.createElement("div");
divCard.setAttribute("class", "card");

// header
let divHeader = document.createElement("div");
divHeader.setAttribute("class", "header");

// Titulo
let aTitle = document.createElement("a");
aTitle.setAttribute("class", "title");
aTitle.setAttribute("href", "#");
aTitle.textContent = titulo;


let aName = document.createElement("a");
aName.setAttribute("class", "name");
aName.setAttribute("href", 'https://github.com/felipeollveira');
aName.setAttribute("target", "_blank");
aName.textContent = '';



divHeader.appendChild(aTitle);
divHeader.appendChild(aName);

// Imagens
let spanImage = document.createElement("span");
spanImage.setAttribute("class", "image");


divHeader.appendChild(spanImage);

divCard.appendChild(divHeader);

// Desc
let pDescription = document.createElement("p");
pDescription.setAttribute("class", "description");

// O limite de caracteres é de 156
const maxLength = 156;
// se haver mais de 156 char no texto ele corta no primeiro '.'(ponto)
// adiciona '...'(reticencias) no primeiro ponto
if (introducao.length > maxLength) {
  const truncatedText = introducao.substring(0, maxLength);
  const lastPeriodIndex = truncatedText.lastIndexOf('.','!');

  if (lastPeriodIndex !== -1) {
    pDescription.textContent = truncatedText.substring(0, lastPeriodIndex + 1) + '..';
  } else pDescription.textContent = truncatedText + '...';
} else pDescription.textContent = introducao;

divCard.appendChild(pDescription);

// infs
let dlPostInfo = document.createElement("div");
dlPostInfo.setAttribute("class", "post-info");

// data
let divPublished = document.createElement("div");
divPublished.setAttribute("class", "cr");

let dtPublished = document.createElement("p");
dtPublished.setAttribute("class", "dt");
dtPublished.textContent = "Publicado";

let ddPublished = document.createElement("p");
ddPublished.setAttribute("class", "dd");
ddPublished.textContent = data.replace('-','/').substring(0,7)

divPublished.appendChild(dtPublished);
divPublished.appendChild(ddPublished);

// Tempo de leitura"
let divReadingTime = document.createElement("div");
divReadingTime.setAttribute("class", "cr");

let dtReadingTime = document.createElement("p");
dtReadingTime.setAttribute("class", "dt");
dtReadingTime.textContent = "Tempo de leitura";
let tempoLeitura = 5;
let ddReadingTime = document.createElement("p");
ddReadingTime.setAttribute("class", "dd");
ddReadingTime.textContent = tempoLeitura + " minutos";

divReadingTime.appendChild(dtReadingTime);
divReadingTime.appendChild(ddReadingTime);

dlPostInfo.appendChild(divPublished);
dlPostInfo.appendChild(divReadingTime);

divCard.appendChild(dlPostInfo);


root.appendChild(divCard);


divHeader.onclick = function() {
  fetch('/', {
    method: 'POST',
    body: JSON.stringify({ titulo, id, dataFormat }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (response.ok) {
        // Redireciona para página HTML)
        window.location.href = response.url;
      } else {
        console.error('Erro ao enviar a solicitação: ', response.status);
      }
    })
    
    .catch(error => {
      console.error('Erro ao enviar a solicitação: ', error);
    });
};

};


if (data.posts.length === 1) {
  not_post.style.width = '40' + '%';
  not_post.style.display = 'flex';
}

}else{
  

  
}

  })
  .catch(error => {
    console.error(error);
  });


