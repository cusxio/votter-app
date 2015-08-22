var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs');

var UserSchema = new Schema({
    email: {
        type: String,
        lowercase: true
    },
    password: String,
    select: false //should to false to not show in results
});


UserSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }
    if (user.password) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    }
});

UserSchema.methods.comparePasswords = function(password, cb) {
    bcrypt.compare(password, this.password, cb);
};

module.exports = mongoose.model('User', UserSchema); // this creates a mongoose instance