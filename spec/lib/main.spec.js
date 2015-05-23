describe('it all', function() {

  it('has the correct interface', function() {
    var sugar = require('../../index');
    expect(sugar.mongo).toBeDefined();
    expect(typeof sugar.mongo.apiApp).toBe('function');
    expect(typeof sugar.mongo.client).toBe('object');
    expect(typeof sugar.mongo.client.MongoConnect).toBe('function');
  });

});
