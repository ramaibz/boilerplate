var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },
  email: String,
  access: { type: String, require: true }
})

userSchema.pre('save', function(next) {
    var user = this;
    bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), function(err, hash) {
        if(err) return next(err);
        user.password = hash;
        next();
    })
})

userSchema.methods.hashing = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validating  = function(password) {
  return bcrypt.compareSync(password, this.local.password)
}

module.exports = mongoose.model('User', userSchema);