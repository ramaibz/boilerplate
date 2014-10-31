angular
    .module('app')
    .controller('UserController', UserController);

function UserController(UserFactory, $scope) {
    var vm = this;
    vm.users = UserFactory.query();

    vm.deleteUser = function(user) {
        user.$delete(function() {
            vm.users = UserFactory.query();
        });
    }

    console.log(vm.users);
}