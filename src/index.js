const express = require('express');
const root = require('./root');
const app = express();
const { join } = require('path');

app.use(express.static(__dirname + '/public'));

app.use('/static', express.static(join(process.cwd(),"views")))


app.use(root)


app.listen(process.env.HOST || 3000)