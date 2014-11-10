angular
    .module('app')
    .controller('UserController', UserController);

function UserController(UserFactory, PopUp, $state) {
    var vm = this;
    vm.users = {};
    vm.error = {};

    vm.accessOption = [
        { opt: 0, val: 'Root' },
        { opt: 1, val: 'Administrator' },
        { opt: 2, val: 'Content Creator' }
    ];

    vm.userData = function() { 
        return UserFactory.query(function(data) {
            vm.users = data;
        }, function(error) {
            console.log('Server error');
        });
    }

    vm.user = new UserFactory;

    vm.addUser = function() {
        vm.user.$save(function(respond) {
            if(respond.error) {
                vm.error.username = !respond.error.username ? respond.error : respond.error.username.message;
            }
            else {
                vm.userData();
            }
        }, function(err) {
            console.log(err);
        })                       
    }

    vm.deleteUser = function(user) {
        if(PopUp.konfirm("Delete this?")) {
            user.$delete(function() {
                vm.userData();
            });
        }   
    }

    vm.userData();

}