const express = require('express')
const root = express();
const bodyParser = require('body-parser');
const path = require('path');
root.set('view engine','ejs')

root.set('views', path.join(__dirname, '..', 'views'));

root.use(bodyParser.urlencoded({ extended: false }));
root.use(bodyParser.json());


root.get('/', (req, res) => {
    res.render('pages/home');
  });
  
  root.post('/', (req, res) => {
    const id = req.body.id
    const titulo = req.body.titulo;
    const data = req.body.dataFormat

    try { 
      console.log(`post id clicado: ${id}`)
        res.redirect(`/${data}/${titulo}0${id}`);
    } catch (error) {
        console.log(error)
    }
  });
  

  root.get('/:data/:titulo', (req, res) => {
    res.render('pages/posts');

  });
  







module.exports = root