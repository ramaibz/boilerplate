angular
    .module('app')
    .controller('UserController', UserController);

function UserController(UserFactory) {
    var vm = this;
    vm.users = UserFactory.query();

    vm.deleteUser = function(user) {
        user.$delete(function() {
            console.log('deleted');
            $window.location.href = "";
        });
    }

    console.log(vm.users);
}