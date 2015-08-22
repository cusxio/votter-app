var User = require('mongoose').model('User');

module.exports = {
    checkEmail: function(req, res) {
    var email = req.query.email.toLowerCase();
    User.findOne({email:email}, function(err, user){
      setTimeout(function() {
        var ok = !(user || err);
        res.status(ok ? 200 : 400).json({
          ok : ok
        });
      }, 500);
    });
  },
};
