module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    res.render('index.html');
  })

  app.get('/admin', isAuth, function(req, res) {
    res.render('views/admin.html', { user: req.user });
  })

  app.get('/admin/*', isAuth, function(req, res, next) {
    res.render('views/admin.html', { user: req.user });
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  })

  app.get('/signup', function(req, res) {
    res.render('views/signup.html', { username: '' });
  })

  app.get('/login', function(req, res){
    if(req.user) {
      res.redirect('/admin');
    }
    else {
      res.render('views/login.html', { msg: req.session.msg, username: '' });
    }
  })

  /*app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/admin',
    failureRedirect: '/login',
    failureFlash: true
  }))*/

  app.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
      if (err) { 
        return next(err);
      }
      if (!user) { 
        res.render('views/login.html', { msg: info.msg, username: req.body.username });
      }
      req.logIn(user, function(err) {
        if (err) { 
          return next(err); 
        }
        req.session.msg = null;
        return res.redirect('/admin');
      });
    })(req, res, next);
  });

  function isAuth(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
    req.session.msg = "You'll need to login";
    res.redirect('/login');
    //res.render('views/login.html', { msg: "You'll need to login", username: '' });
  }
}

/*function isLogged(req, res, next) {
  req.isAuthenticated() ? return next() : res.redirect('/');
}*/