var Article = require('../model/article.js');

getArticle = function(req, res) {
    return Article.find({}).populate('createdBy', 'username').exec(function(err, article) {
        if(err) {
            return res.send({ error: err });
        }
        else {
            var articles = [];
            for(var i = 0; i < article.length; i++) {
                articles[i] = { 
                    title: article[i].title,
                    createdBy: article[i].createdBy.username,
                    createdOn: article[i].createdOn,
                    content: article[i].content,
                    tag: article[i].tag
                };
            }
            res.json(articles);
        }
    })
}

addArticle = function(req, res) {
    var articleContent = new Article({
        title: req.body.title,
        createdBy: req.user.id,
        content: req.body.content,
        tag: req.body.tags
    })

    articleContent.save(function(err, data) {
        if(err) {
            res.json({ error: err });
        }
        else {
            res.json({ success: 'success' + data });
        }
    })
}

editArticle = function(req, res, next) {

}

deleteArticle = function(req, res, next) {
    return Article.findById(req.params.article_id, function(err, article) {
        if(!article) {
            console.log(err);
            next;
        }
        else {
            return article.remove(function(err) {
                if(err) {
                    console.log(err);
                    next;
                }
                else {
                    res.json({ success: 'deleted' });
                }
            })
        }

    })
}