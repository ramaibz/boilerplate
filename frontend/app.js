<<<<<<< HEAD
angular
  .module('app', ['ui.router', 'ngResource', 'app.factory'])
  .config(routes);


/*angular
  .module('app')
  .factory('UserFactory', function($resource) {
    return $resource('api/administrasi/user/:id');
  })*/

angular
  .module('app.factory', ['ngResource'])
  .factory('UserFactory', userFactory)

function userFactory($resource) {
  return $resource('api/administrasi/user/:id', { id: '@_id' }, {
        update: {
            method: 'PUT'
        }
    })
}
=======
angular.module('newsPortal', ['ui.router']);
>>>>>>> 1b1616cddd305a048d98e9c834535e1a96f72375
