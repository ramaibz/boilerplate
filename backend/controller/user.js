var User = require('../model/user');

  allUser = function(req, res) {
    return User.find(function(err, users) {
      if(!err) {
        res.json(users);
      }
      else {
        res.statusCode = 500; 
        console.log('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({ 
          error: 'Server error' 
        });
      }
    })
  }

  singleUser = function(req, res) {
    return User.findById(req.params.id, function(err, user) {
      if(!user) {
        res.statusCode = 404;
        return res.send({ error: 'User Not Found' });
      }
      if(!err) {
        return res.send({
          status: 'OK',
          user: user
        });
      } else {
        res.statusCode = 500;
        return res.send({ 
          error: 'Server still sleeping..'
        })
      }
    })
  }

  addUser = function(req, res) {
    var userValue = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      access: req.body.access
    });

    User.findOne({ username: userValue.username }, function(err, user) {
      if (err) throw err.errors;
      if(user) {
        //res.send({ stat: 'User already exist', user: user });
        //res.render('views/admin.html', { message: 'ssss' })
        res.json({ error: 'User already exist' })
      }
      else {
        userValue.save(function(err, data) {
          if (err) {
            res.json({ error: err.errors });
          }
          else {
            res.json({ success: 'Success' });
            console.log(data);
          }
        })             
      }
    })

    
  }

  deleteUser = function(req, res) {
    return User.findById(req.params.id, function(err, user) {
      if(!user) {
        res.statusCode = 404;
      }

      return user.remove(function(err) {
        if(!err) {
          console.log(user + ' removed');
          res.redirect('/admin/user');
        }
        else {
          throw err;
        }
      })
    })
  }