var express, app, bodyParser;

express = require('express');
bodyParser = require('body-parser');

module.exports = app = express();

app.get('/', function(req, res) {
  res.send("welcome to the api spot");
});

app.use('/:collection', function(req, res, next) {
  try {
    debugger
    req.collection = require('../client/collections/' + req.params.collection);
    next();
  }
  catch (ex) {
    res.status(404);
    next(req.params.collection + ' not found.');
  }
});

app.get('/:collection', function(req, res) {
  req.collection.find()
    .then(handleFound)
    .catch(handleFindError);

  function handleFound(results) {
    res.json(results);
  }

  function handleFindError(err) {
    res.status(500).send(err);
  }
});

app.post('/:collection', bodyParser.json(), function(req, res) {
  var postData = _.pick(req.body, ['name']);

  req.collection.save(postData)
    .then(handleSaved)
    .catch(handleSaveError);

  function handleSaved(saveResults) {
    res.json(saveResults);
  }

  function handleSaveError(err) {
    console.log('err', err);
    res.status(500).send(err.stack);
  }
});

app.put('/:collection', bodyParser.json(), function(req, res) {
  var updateData = _.pick(req.body, ['id', 'name']);

  req.collection.save(updateData)
    .then(handleSavedd)
    .catch(handleSaveError);

  function handleSaved(saveResults) {
    res.json(saveResults);
  }

  function handleSaveError(err) {
    console.log('err', err);
    res.status(500).send(err);
  }
});

app.delete('/:collection/:coll_id', bodyParser.json(), function(req, res) {

  var targetId = req.params.coll_id;

  req.collection.delete(targetId)
    .then(handleDeleted)
    .catch(handleDeleteError);

  function handleDeleted(deleteResults) {
    res.json(deleteResults)
  }

  function handleDeleteError(err) {
    console.log('err', err);
    res.status(500).send(err);
  }

});

app.use('/:collection', function(err, req, res, next) {
  console.log(err);
  res.send('collection route error');
});



