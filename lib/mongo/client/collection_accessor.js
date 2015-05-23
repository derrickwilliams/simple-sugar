'use strict';

var Promise, _, ObjectID;

Promise = require('bluebird');
_ = require('lodash');
ObjectID = require('mongodb').ObjectID;

function promise(fn) {
  return new Promise(fn);
}

module.exports = function CollectionAccessor(connection, options) {

  return function Accessor(collectionName) {
    var collection;

    collection = connection.collection(collectionName);

    return {
      save: Promise.promisify(_.bind(collection.insert, collection)),
      update: updateFn,
      find: findFn,
      findOne: Promise.promisify(_.bind(collection.findOne, collection)),
      delete: deleteFn
    };

    function findFn(query) {
      return new Promise(function(resolve, reject) {
        return collection.find(query).toArray(function(err, coll) {
          return err ? reject(err) : resolve(coll);
        })
      });
    }

    function updateFn(doc) {
      return promise(handler);

      function handler(res, rej) {
        var updated =  _.omit(doc, ['_id']);
        return collection.update({ _id: ObjectID(doc.id) }, updated, doneCb);

        function doneCb(err, results) {
          return err ? rej(err) : res(results);
        }
      }
    }

    function deleteFn(id) {
      return promise(function handler(res, rej) {
        console.log('deleting', id);
        collection.deleteOne({ _id: ObjectID(id) }, function deleteDone(err, results) {
          console.log('err', err);
          return err ? rej(err) : res(results);
        })
      });
    }
  };

};
