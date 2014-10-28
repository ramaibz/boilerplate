var UserController = require('../controller/user');

module.exports = function(app) {

  app.get('/api/administrasi/user', allUser);
  app.get('/api/administrasi/user/:id', singleUser);
  app.post('/api/administrasi/user', addUser);
  app.delete('/api/administrasi/user/:id', deleteUser);

}