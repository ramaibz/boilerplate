var LocalStrategy = require('passport-local').Strategy;

var Admin = require('../backend/model/user');

module.exports = function(passport) {
  
  /*passport.use('local-adduser', new localStrategy({
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
  })
  )*/

  passport.use('local-login', new LocalStrategy({
    // set the field name here
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {
    process.nextTick(function() {
      Admin.findOne({ 'username' : username }, function(err, admin) {
        if(err) {
          return done(err);
        }
        if(!admin) {
          return done(null, false, { msg : 'user is not exist' });
        }
        if(!admin.validating(password)) {
          return done(null, false, { msg : 'invalid username or password' });
        }
        return done(null, admin);
      })
    })
    
  })
  )

  passport.serializeUser(function(admin, done) {
    if(admin) {
      done(null, admin._id);  
    }
  });
  
  passport.deserializeUser(function(id, done) {
    Admin.findById(id, function(err, admin) {
      done(err, admin);
    })
  });
}