function routes($stateProvider, $urlRouterProvider, $locationProvider) {
  //$urlRouterProvider.otherwise('/');
  $stateProvider
    .state('admin', {
      url: '/admin/dashboard',
      templateUrl: 'views/dashboard.html'
    })
    .state('user', {
      url: '/admin/user',
      templateUrl: 'views/user.html',
      controller: 'UserController',
      controllerAs: 'vm'
    })
    .state('article', {
      url: '/admin/article',
      templateUrl: 'views/article.html',
      controller: 'ArticleController',
      controllerAs: 'vm'
    })

  $locationProvider.html5Mode(true);
}