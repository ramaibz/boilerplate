angular
    .module('app')
    .controller('ArticleController', ArticleController)

function ArticleController(ArticleService, PopUp) {
    var vm = this;
    vm.articles = {};
    vm.article = new ArticleService;

    vm.getArticles = function() {       
        return ArticleService.query(function(data) {
            console.log(data);
            vm.articles = data;
        }, function(err) {
            vm.articles = err;
        })
    }

    
    vm.addArticle = function() {
        vm.article.$save(function(respond) {
            if(respond.error) {
                vm.error = respond;
            }
            else {
                vm.getArticles();
            }
        }, function(err) {
            console.log(err);
        })
    }

    vm.deleteArticle = function(article) {
        if(PopUp.konfirm("Delete this?")) {
            article.$delete(function() {
                vm.getArticles();
            });
        }   
    }

    vm.getArticles();

}