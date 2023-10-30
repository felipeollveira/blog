const express = require('express')
const root = express();
const bodyParser = require('body-parser');
const pub = require('./controls/posts');
root.set('view engine','ejs')


root.use(bodyParser.urlencoded({ extended: false }));
root.use(bodyParser.json());


root.get('/', (req, res) => {
    res.render('pages/home');
  });
  
  root.post('/', (req, res) => {
    const id = req.body.id;
    console.log(`Post clicado ID: ${id}`)
    res.redirect(`/post/${id}`);
  });
  

  root.get('/post//:id', (req, res) => {
    res.render('pages/posts');
   
  });
  







module.exports = root