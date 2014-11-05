angular
    .module('app')
    .controller('UserController', UserController);

function UserController(UserFactory, $scope) {
    var vm = this;
    vm.users = UserFactory.query();
    vm.user = new UserFactory;

    vm.addUser = function() {
        vm.user.$save(function() {
            $state.go('user');
        })
    }

    vm.deleteUser = function(user) {
        user.$delete(function() {
            vm.users = UserFactory.query();
        });
    }

}