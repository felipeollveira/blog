console.log('')
const root = document.getElementById('news')

fetch('https://lovely-worm-tux.cyclic.app/api')
  .then(response => {
    if (!response.ok) {
      throw new Error('Não foi possível obter os dados da API.');
    }
    return response.json();
  })
  .then(data => { 
    
    console.log(data.posts);
    let limit = data.posts.length

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
   
        let titulo = post.titulo
        let assunto = post.assunto
        let conclusao = post.conclusao
        let data = post.data
        let autor = post.autor
        let introducao = post.introducao



let divRoot = document.createElement("div");
divRoot.setAttribute("class", "cards");

let sectionText = document.createElement("section");
sectionText.setAttribute("class", "l-card__text");

let paragrafo = document.createElement("p");
paragrafo.textContent = titulo;

sectionText.appendChild(paragrafo);


let sectionUser = document.createElement("section");
sectionUser.setAttribute("class", "l-card__user");


let divUserImage = document.createElement("div");
divUserImage.setAttribute("class", "l-card__userImage");

let userImage = document.createElement("img");
userImage.setAttribute("src", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fblog.nevercodealone.de%2Fwp-content%2Fuploads%2F2020%2F10%2Fnodejs-logo-1024x512.png&f=1&nofb=1&ipt=85410c44a48b98fc4c2a7b51f213137d9c6b892ccd18c31b89fb5c1f00de5a57&ipo=images");
userImage.setAttribute("alt", "tech");


let divUserInfo = document.createElement("div");
divUserInfo.setAttribute("class", "l-card__userInfo");


let spanUser1 = document.createElement("span");
spanUser1.textContent = "NODEJS";

let spanUser2 = document.createElement("span");
spanUser2.textContent = data;

divUserImage.appendChild(userImage);

divUserInfo.appendChild(spanUser1);
divUserInfo.appendChild(spanUser2);

sectionUser.appendChild(divUserImage);
sectionUser.appendChild(divUserInfo);

let lCardContainer = document.querySelector(".l-card");



divRoot.appendChild(sectionText);
divRoot.appendChild(sectionUser);

lCardContainer.appendChild(divRoot)

      }







  })
  .catch(error => {
    console.error(error);
  });

