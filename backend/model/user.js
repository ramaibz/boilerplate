var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    Schema = mongoose.Schema;

function validator(val) {
  return val.length <= 3 ? false : true;
}

function isNotA(val) {
  return val == 'aaa' ? false : true;
}

var many = [
  { validator: validator, msg: 'length less than 5' },
  { validator: isNotA, msg: 'Your name is aaa'}
]

var userSchema = new Schema({
  username: { type: String, required: 'Please input your username', trim: true, validate: many },
  password: { type: String, required: 'Please input password', trim: true },
  email: { type: String, required: 'Please input the email', trim: true },
  access: { type: String, required: 'Please input access', trim: true },
  join: { type: Date, default: Date.now }
})

/*userSchema.path('username').validate(function(user) {
  return !!user.length > 5;
}, 'Username is empty!');*/

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
  return bcrypt.compareSync(password, this.local.password)
}

module.exports = mongoose.model('User', userSchema);