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
    /*
        console.log("Post ID: " + post.post_id);
        console.log("Título: " + post.titulo);
        console.log("Assunto: " + post.assunto);
        console.log("Conclusão: " + post.conclusao);
        console.log("Data: " + post.data);
        console.log("Autor: " + post.autor);
        console.log("Introdução: " + post.introducao);
        console.log("\n");
    */
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

// Header
let divHeader = document.createElement("div");
divHeader.setAttribute("class", "header");

// Title
let aTitle = document.createElement("a");
aTitle.setAttribute("class", "title");
aTitle.setAttribute("href", "#");
aTitle.textContent = titulo;

// Name
let aName = document.createElement("a");
aName.setAttribute("class", "name");
aName.setAttribute("href", 'https://github.com/felipeollveira');
aName.setAttribute("target", "_blank");
aName.textContent = '';
// "By " + autor; 


divHeader.appendChild(aTitle);
divHeader.appendChild(aName);

// Image
let spanImage = document.createElement("span");
spanImage.setAttribute("class", "image");
// Se desejar adicionar uma imagem, pode fazê-lo aqui.

divHeader.appendChild(spanImage);

divCard.appendChild(divHeader);

// Description
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

// Post Info
let dlPostInfo = document.createElement("div");
dlPostInfo.setAttribute("class", "post-info");

// Published Date
let divPublished = document.createElement("div");
divPublished.setAttribute("class", "cr");

let dtPublished = document.createElement("dt");
dtPublished.setAttribute("class", "dt");
dtPublished.textContent = "Publicado";

let ddPublished = document.createElement("dd");
ddPublished.setAttribute("class", "dd");
ddPublished.textContent = new Date(data).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

divPublished.appendChild(dtPublished);
divPublished.appendChild(ddPublished);

// Tempo de leitura"
let divReadingTime = document.createElement("div");
divReadingTime.setAttribute("class", "cr");

let dtReadingTime = document.createElement("dt");
dtReadingTime.setAttribute("class", "dt");
dtReadingTime.textContent = "Tempo de leitura";
let tempoLeitura = 5;
let ddReadingTime = document.createElement("dd");
ddReadingTime.setAttribute("class", "dd");
ddReadingTime.textContent = tempoLeitura + " minutos";

divReadingTime.appendChild(dtReadingTime);
divReadingTime.appendChild(ddReadingTime);

dlPostInfo.appendChild(divPublished);
dlPostInfo.appendChild(divReadingTime);

divCard.appendChild(dlPostInfo);


root.appendChild(divCard);


aTitle.onclick = function() {
  fetch('/', {
    method: 'POST',
    body: JSON.stringify({ titulo, id, dataFormat }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (response.ok) {
        // Redireciona para a resposta (página HTML)
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

  let sempostagem = document.createElement("div")

  let nopost = document.createElement("p");
  nopost.setAttribute("class", "no-post");
  nopost.textContent = 'Por enquanto, nada por aqui :|'

  sempostagem.appendChild(nopost);
  not_post.style.display = 'flex';

  // Criação da seção
let sectionFooter = document.createElement("section");
sectionFooter.setAttribute("class", "footer");

// Criação do parágrafo
let paragraph = document.createElement("p");
paragraph.textContent = "Inscreva-se para receber nossas atualizações por email:";

// Criação do formulário
let form = document.createElement("form");

// Criação do campo de email
let emailInput = document.createElement("input");
emailInput.setAttribute("type", "email");
emailInput.setAttribute("placeholder", "Seu endereço de email");

// Criação do botão de inscrição
let submitButton = document.createElement("input");
submitButton.setAttribute("type", "submit");
submitButton.setAttribute("value", "Inscrever-se");

// Adição dos elementos ao formulário
form.appendChild(emailInput);
form.appendChild(submitButton);

// Adição dos elementos à seção
sectionFooter.appendChild(paragraph);
sectionFooter.appendChild(form);

// Adição da seção ao corpo do documento
sempostagem.appendChild(sectionFooter);
not_post.appendChild(sempostagem)




  
  footer.style.display = 'none'
  
}

  })
  .catch(error => {
    console.error(error);
  });


