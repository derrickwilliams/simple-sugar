'use strict';

var express, app, simpleSugar, mongoApi;

express = require('express');
simpleSugar = require('../index');

app = express();
mongoApi = simpleSugar.mongo.apiApp;

app.use(mongoApi);
app.listen(4444);

