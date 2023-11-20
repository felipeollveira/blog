const express = require('express')
const root = express();
const bodyParser = require('body-parser');
const path = require('path');
root.set('view engine','ejs')
// PROCURANDO PELA PASTA VIEWS no VERCEL
root.set('views', path.join(__dirname, '..', 'views'));

root.use(bodyParser.urlencoded({ extended: false }));
root.use(bodyParser.json());


root.get('/', (req, res) => {
    res.render('pages/home');
  });
  
const extrairTitulo = (req, res, next) => {
  const { titulo } = req.params;
  req.titulo = titulo;
  next();
};

// Rota para lidar com o POST
root.post('/', (req, res) => {
  const id = req.body.id;
  const titulo = req.body.titulo;
  const data = req.body.dataFormat;

  try {
    console.log(`post id clicado: ${id}`);
    res.redirect(`/${data}/${titulo}`);
  } catch (error) {
    console.log(error);
  }
});

// Rota para lidar com o GET, usando o middleware personalizado
root.get('/:data/:titulo', extrairTitulo, (req, res) => {
  const titulo = req.titulo;

  // Agora você tem acesso ao 'titulo' nesta rota

  res.render('pages/posts', { titulo });
});

  







module.exports = root