var ArticleController = require('../controller/article.js');

module.exports = function(app) {
    app.get('/api/article', getArticle);
    app.post('/api/article', addArticle);
    app.get('/api/article/:article_id', editArticle);
    app.delete('/api/article/:article_id', deleteArticle);
}