const feelings = require('./feelings/feelings.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(feelings);
};
