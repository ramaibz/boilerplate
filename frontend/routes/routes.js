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

  $locationProvider.html5Mode(true);
}