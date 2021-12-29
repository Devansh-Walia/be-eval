'use strict';

const express = require('express');
const path = require('path');
const router = require('./routes/router');

// init app
const app = express();
const port = process.env.PORT || 3000;
// load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);
app.listen(port, () => console.log('App is listening on url http://localhost:' + port));

