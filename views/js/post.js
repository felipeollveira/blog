
const currentURL = window.location.href;
const urlParts = currentURL.split('/');
const lastPart = urlParts[urlParts.length - 1];
  const ide = lastPart.slice(-2);


console.log('ID da postagem:', ide);


fetch('https://lovely-worm-tux.cyclic.app/api')
  .then(response => {
    if (!response.ok) {
      throw new Error('Não foi possível obter os dados da API.');
    }
    return response.json();
  })
  .then(data => { 
    const ideNumero = parseInt(ide, 10);
    const post = data.posts.find(post => post.post_id === ideNumero);

    if (post) {
      console.log('Título da postagem:', post.titulo);
      let id = post.post_id
      let titulo = post.titulo
      let assunto = post.desenvolvimento
      let conclusao = post.conclusao
      let data = post.data
      let autor = post.autor
      let introducao = post.introducao

        
function createElementWithClass(tag, className, content) {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = content;
    return element;
}
const assuntoSplit = introducao.split('');
const contemAsterisco = assuntoSplit.includes('*');


const regex = /\*(.*?)\*/; 





// Criação da estrutura HTML
const body = document.getElementById('container');

// Cabeçalho da página
const dataPublicacao = document.getElementById("dataPub")
dataPublicacao.textContent = data.substring(0,10)

const header = document.getElementById("nomeTitulo");
header.className = "page-header";
header.textContent = titulo

//imagem src
const img = document.getElementById("capa")
img.src = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fblog.unipar.br%2Fwp-content%2Fuploads%2F2019%2F09%2Foriginal-d1f3afad676442faca79cdb67a25bc27.png&f=1&nofb=1&ipt=4831d35367c2ed72905f464e7789a8c7bdf31055e92a59d82cb7df49aa3ca0d9&ipo=images'

const formatTextWithAsterisks = (text) =>  {
  const textSplit = text.split('');
  const hasAsterisks = textSplit.includes('*');
  
  let formattedText = [text];


  if (textSplit.includes('[')) {
      formattedText = formattedText.map(text => text.replace(/\[(.*?)\]/g, '<article class="obs">$1</article>'));
  }if (textSplit.includes('#')) {
      formattedText = formattedText.map(text => text.replace(/#(.*?)#/g, `<a href="$1" target="_blank">Clique aqui!</a>`));
  }if (hasAsterisks) {
      formattedText = formattedText.map(text => text.replace(/\*(.*?)\*/g, '<span class="strong">$1</span>'));
  }
  
  //  formattedText é um array que contém as formatações aplicadas

  const finalFormattedText = formattedText.join('');
  
  return finalFormattedText;
  
}  



function sanitizeHTML(text) {
  return text.replace(/<(?!\/?(span|article|a))[^>]*>/g, '');
}




// Seção de Introdução
const introductionSection = document.createElement("section");
introductionSection.className = "section introduction";
const pIntroduction = createElementWithClass("p", "section-content");
introductionSection.appendChild(pIntroduction);
pIntroduction.innerHTML = sanitizeHTML(formatTextWithAsterisks(introducao));

// Seção de Desenvolvimento
const developmentSection = document.createElement("section");
developmentSection.className = "section development";
const pDevelopment = createElementWithClass("p", "section-content");
developmentSection.appendChild(pDevelopment);
pDevelopment.innerHTML = sanitizeHTML(formatTextWithAsterisks(assunto));

// Seção de Conclusão
const conclusionSection = document.createElement("section");
conclusionSection.className = "section conclusion";
const pConclusion = createElementWithClass("p", "section-content");
conclusionSection.appendChild(pConclusion);
pConclusion.innerHTML = sanitizeHTML(formatTextWithAsterisks(conclusao));

//  elementos criados ao corpo da página
body.appendChild(introductionSection);
body.appendChild(developmentSection);
body.appendChild(conclusionSection);

} else {
      console.log('Postagem não encontrada');
    }
})
  .catch(error => {
    console.error(error);
    })







