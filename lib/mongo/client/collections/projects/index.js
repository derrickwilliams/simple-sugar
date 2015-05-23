var connect = require('../../').MongoConnect,
    projects;

projects = module.exports = {};

Object.defineProperties(projects, {

  find: {
    enumerable: true,
    value: function find(query) {
      return connect({ db: 'SIMPLEPM' })
        .then(doFind);

      function doFind(conn) {
        return conn.collection('projects').find();
      }
    }
  },

  save: {
    enumerable: true,
    value: function save(doc) {
      var action = doc.id ? 'update' : 'save';

      doc._id = doc.id || null;

      return connect({ db: 'SIMPLEPM' })
        .then(doSave);

      function doSave(conn) {
        return conn.collection('projects')[action](doc);
      }
    }
  },

  delete: {
    enumerable: true,
    value: function deleteDoc(id) {
      return connect({ db: 'SIMPLEPM' })
        .then(doDelete);

      function doDelete(conn) {
        return conn.collection('projects')
          .delete(id)
      }
    }
  }

});
