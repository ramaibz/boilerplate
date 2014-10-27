module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    res.render('index.html');
  })

  app.get('/login', function(req, res){
    res.render('views/admin.html');
  })

  app.get('/administrasi', function(req, res) {
    res.render('views/login.html');
  })

  app.get('/administrasi/dashboard', function(req, res) {
    res.render('views/admin.html');
    console.log('menu dashboard');
  })

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  })
}

/*function isLogged(req, res, next) {
  req.isAuthenticated() ? return next() : res.redirect('/');
}*/