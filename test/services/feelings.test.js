const assert = require('assert');
const app = require('../../src/app');

describe('\'feelings\' service', () => {
  it('registered the service', () => {
    const service = app.service('feelings');

    assert.ok(service, 'Registered the service');
  });
});
