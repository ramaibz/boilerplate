var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    moment = require('moment'),
    Schema = mongoose.Schema;

/*function isNotNull(val) {
  return !val ? false : true;
}
function isLessThan3(val) {
  if(!val) {
    return false;
  }
  else if(val.length <= 3) {
    return false;
  }
  else {
    return true;
  }
}

function isNotA(val) {
  return val == 'aaaaa' ? false : true;
}*/

/*var many = [
  { validator: isNotNull, msg: 'Empty value' },
  { validator: isLessThan3, msg: 'length less than 5' },
  { validator: isNotA, msg: 'Your name is aaa'}
]*/

var userSchema = new Schema({
  username: { 
    type: String, 
    trim: true, 
    required: true 
  },
  password: { 
    type: String, 
    trim: true, 
    required: true 
  },
  email: { 
    type: String, 
    trim: true, 
    required: true 
  },
  access: { 
    type: String, 
    trim: true, 
    required: true 
  },
  joindate: { 
    type: Date, 
    default: Date.now 
  }
})

userSchema.path('username').validate(function(val) {
  if(!val) {
    return false
  }
  else if(val.length <= 3) {
    return false
  }
  else if(val == 'aaaa') {
    return false
  }
  else {
    return true
  }
  //return val.length <= 3 && val == "aaa" ? false : true;
}, 'Invalid data format' )

userSchema.pre('save', function(callback) {
    var user = this;

      // Break out if the password hasn't changed
      if (!user.isModified('password')) return callback();

      // Password changed so we need to hash it
      bcrypt.genSalt(10, function(err, salt) {
        if (err) return callback(err);

        bcrypt.hash(user.password, salt, null, function(err, hash) {
          if (err) return callback(err);
          user.password = hash;
          callback();
        });
      });
})

userSchema.methods.hashing = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validating  = function(password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', userSchema);