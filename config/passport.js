var localStrategy = require('passport-local').Strategy;

var Admin = require('../app/model/user');

module.exports = function(passport) {
  
  passport.serializeUser(function(admin, done) {
    done(null, admin.id);
  });
  
  passport.deserializeUser(function(id, done) {
    Admin.findById(id, function(err, user) {
      done(err, user);
    })
  });

  passport.use('local-adduser', new localStrategy({
    passReqToCallBack : true;
  },
  function(req, username, password, done){
    process.nextTick(function() {
      Admin.findOne({ 'username' : username }, function(err, user) {
        if(err) {
          return done(err);
        }
        if(user) {
          return done(null, false, req.flash('Username is already existed'));
        }
        else {
          var newUser = new Admin();
          newUser.username = username;
          newUser.password = newUser.hashing(password);
          newUser.save(function(err) {
            if(err) {
              throw err;
            }
            return done(null, newUser);
          })
        }
      })
    })
  }))
}