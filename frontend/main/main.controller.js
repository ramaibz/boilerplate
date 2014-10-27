function MainController() {
    var vm = this;
    vm.pageClass = 'a-main';
}

angular
    .module('app')
    .controller('MainController', MainController);