function routes($stateProvider, $urlRouterProvider, $locationProvider) {
  //$urlRouterProvider.otherwise('/');
  $stateProvider
    .state('admin', {
      url: '/administrasi/dashboard',
      templateUrl: 'views/dashboard.html'
    })
    .state('user', {
      url: '/administrasi/user',
      templateUrl: 'views/user.html',
      controller: 'UserController',
      controllerAs: 'vm'
    })

  $locationProvider.html5Mode(true);
}