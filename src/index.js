const express = require('express');
const session = require('express-session');
const root = require('./root');
const app = express();
const { join } = require('path');
require('dotenv').config()
const sessionSecret = process.env.private_key
const cors = require('cors')
const compress = require('compression')

app.use(cors())
app.use(compress())
app.use(session({ secret: sessionSecret, resave: true, saveUninitialized: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.static('src'))

app.use('/static', express.static(join("views")))


app.use(root)


app.listen(4000)