const express = require('express')
const root = express();
const bodyParser = require('body-parser');
const path = require('path');
const obterDados = require('./processApi');
root.set('view engine','ejs')
// PROCURANDO PELA PASTA VIEWS no VERCEL
root.set('views', path.join(__dirname, '..', 'views'));

root.use(bodyParser.urlencoded({ extended: false }));
root.use(bodyParser.json());



root.get('/', async (req, res) => {
  try {
    const data = await obterDados();
    res.render('pages/home', { data });
  } catch (error) {
    console.error('Erro ao renderizar página:', error.message);
    res.status(500).send('Erro interno no servidor.');
  }
});
  
const extrairTitulo = (req, res, next) => {
  const { titulo } = req.params;
  req.titulo = titulo;
  next();
};

// Rota para lidar com o POST
root.post('/', (req, res) => {
  const { titulo, dataFormat } = req.body;
 

  try {
    res.redirect(`/${dataFormat}/${titulo}`);
  } catch (error) {
    console.log(error);
    res.status(500).send('Erro interno no servidor.');
  }
});


// Rota para lidar com o GET, usando o middleware personalizado
root.get('/:data/:titulo', extrairTitulo, (req, res) => {
  const titulo = req.titulo;
  res.render('pages/posts', { titulo });
});

  







module.exports = root