'use strict';

var Promise, mongo, client, _, mongoConnect, connection;

Promise = require('bluebird');
mongo = require('mongodb');
client = mongo.MongoClient;
mongoConnect = Promise.promisify(client.connect);
_ = require('lodash');

var CollectionAccessor = require('./collection_accessor');

module.exports = MongoConnect();

function MongoConnect() {

  var _connection;

  return function Connection(params) {
    return _connection ?
      Promise.resolve(_connection) :
      new Promise(_.partial(doConnection, params));
  };

  function doConnection(params, resolve, reject) {
    params = _.assign({
      host: 'mongodb://localhost:27017',
      db: null
    }, params);

    if (_.isEqual(params.db, null)) throw new Error('missing param: db');

    return mongoConnect(mongoUrl(params))
      .then(handleConnect)
      .catch(handleConnectError);

    function handleConnect(conn) {
      _connection = {
        _connection: conn,
        collection: CollectionAccessor(conn)
      };

      return resolve(_connection);
    }

    function handleConnectError(err) {
      return reject(err);
    }
  }

}


function mongoUrl(params) {
  return params.host + '/' + params.db;
}
