angular
    .module('app')
    .controller('UserController', UserController);

function UserController(UserFactory) {
    var vm = this;
    vm.users = UserFactory.query();

    vm.deleteUser = function(user) {
        user.$delete(function() {
            console.log('deleted');
            vm.users;
        });
    }

    console.log(vm.users);
}