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
  return $resource('/api/admin/user/:id', { id: '@_id' }, {
        update: {
            method: 'PUT'
        }
    })
}
