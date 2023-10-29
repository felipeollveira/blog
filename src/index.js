const express = require('express');
const session = require('express-session');
const root = require('./root');
const app = express();
const { join } = require('path');
require('dotenv').config()

app.use(session({ secret: process.env.private_key, resave: true, saveUninitialized: true }));
app.use(express.static(__dirname + '/public'));

app.use('/static', express.static(join(process.cwd(),"views")))


app.use(root)


app.listen(process.env.HOST || 3000)