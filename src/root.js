const express = require('express')
const root = express();
const bodyParser = require('body-parser');
root.set('view engine','ejs')


root.use(bodyParser.urlencoded({ extended: false }));
root.use(bodyParser.json());

root.get('/', (req, res) => {
    res.render('pages/home')
})








module.exports = root