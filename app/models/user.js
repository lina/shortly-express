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
    });
  }


});




User.userMethod = {
  login: function (username, password) {
    console.log("FIRST LEVEL ");
    // if (!username || !password) throw new Error('Username and password are both required');
    // this.fetch({
    //   require: true
    //   console.log("")
    // })


    return bcrypt.compareSync(model.get('hash'), password);

    // .tap(function (user) {
    //   console.log("######");
    //   console.log("User test: "+ bcrypt.compareAsync(user.get('hash'), password));
    //   return bcrypt.compareAsync(user.get('hash'), password);
    // });
  }
};

module.exports = User;
