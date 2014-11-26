angular
  .module('app', ['ui.router', 'ui.bootstrap', 'ngResource', 'app.factory'])
  .config(routes);


/*angular
  .module('app')
  .factory('UserFactory', function($resource) {
    return $resource('api/administrasi/user/:id');
  })*/

angular
  .module('app.factory', ['ngResource'])
  .factory('UserFactory', userFactory)
  .factory('ArticleService', articleService)
  .service('PopUp', confirmDialog);

function userFactory($resource) {
  return $resource('/api/admin/user/:id', { id: '@_id' }, {
        update: {
            method: 'PUT'
        }
    })
}

function confirmDialog($window) {
  this.konfirm = function(msg) {
    return $window.confirm(msg);
  }
}

function articleService($resource) {
  return $resource('/api/article/:id', { id: '@_id' }, {
        update: {
            method: 'PUT'
        }
    })
}
