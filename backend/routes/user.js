var UserController = require('../controller/user.js');

module.exports = function(app) {

  app.get('/api/admin/user', allUser);
  app.get('/api/admin/user/:id', singleUser);
  app.post('/api/admin/user', addUser);
  app.delete('/api/admin/user/:id', deleteUser);

}