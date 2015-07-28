var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  links: function() {
    return this.hasMany(Link);
  },

  initialize: function() {
    this.on('creating', function (model, attrs, options) {
      // console.log("INITIALIZE RUNS");
      // console.log("model----->", model);
      // console.log("attrs----->", attrs);
      var password = model.get('password');
      var hash = bcrypt.hashSync(password);
      model.set('hash', hash);
      model.unset('password');
      // console.log("model", model);
    });
  },

  login: function(password, cb) {
    if (!password) {
      throw new Error('username and password are both required');
    } else {
      this.fetch().then(function (user){
        if (!user) {
          console.log("inside !user")
          cb(false);
          throw new Error('user not found');
        } else {
          var hash = user.get('hash');
          bcrypt.compare(password, hash, function(err, res) {
            if (err) { 
              throw err; 
              cb(false);
            } else {
              cb(res);
            }
          }); // bcrypt
        } // else 
      }); // then
    } // else
  } // login function

}); // extend


module.exports = User;

