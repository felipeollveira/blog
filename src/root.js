const express = require('express')
const root = express();
const bodyParser = require('body-parser');
const path = require('path');
const obterDados = require('./control/processApi');
root.set('view engine','ejs')
// PROCURANDO PELA PASTA VIEWS no VERCEL
root.set('views', path.join(__dirname, '..', 'views'));

root.use(bodyParser.urlencoded({ extended: false }));
root.use(bodyParser.json());


root.get('/', async (req, res) => {
  try {
      res.render('pages/home');
  } catch (error) {
    console.error('Erro ao renderizar página:', error.message);
    res.status(500).send('Erro interno no servidor.');
  }
});
  
const extrairTitulo = (req, res, next) => {
  req.titulo = req.params.titulo;
  next(); 
};

// Rota para lidar com o POST
root.post('/', (req, res) => {
  const { titulo, autor, id } = req.body;

  try {
    res.redirect(`/${autor}/${titulo}/${id}`);
  } catch (error) {
    console.log(error);
    res.status(500).send('Erro interno no servidor.');
  }
});



// Rota para lidar com o GET, usando o middleware personalizado
root.get('/:autor/:titulo/:id', extrairTitulo, (req, res) => {
  const titulo = req.titulo;
  res.render('pages/posts', { titulo });
});


root.get('/calculeIMC', (req, res) => {
  res.render('pages/imc');
});

  







module.exports = root