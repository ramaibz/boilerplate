function AdminController() {
    var vm = this;
    vm.pageClass = 'a-main';
}

angular
    .module('app')
    .controller('AdminController', AdminController);