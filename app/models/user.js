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
  }


}, {

  login: Promise.method(function(username, password) {
    var isAuthenticated = false;

    console.log("********************************login promise function initialised");


    if (!username || !password) throw new Error('username and password are both required');
    console.log("checking-------->", new User({"username": username}).fetch());
    new User({"username": username}).fetch().then(function(model) {
      bcrypt.compare(password, model.get('hash'), function(err, res) {
        if(err) {
          return;
        } else if (res) {
          //redirect
        } else if (!res) {
          // enter password again
        } else {
          //handle other cases
        }
        isAuthenticated = true;
        return res;
      });
      return isAuthenticated;
    })
    console.log("username, password", username, password);
  })

}

);




// var that = this;


// User.userMethod = {
//   login: function (username, password) {
//     console.log("FIRST LEVEL ");
//     // if (!username || !password) throw new Error('Username and password are both required');
//     // this.fetch({
//     //   require: true
//     //   console.log("")
//     // })
//     console.log("----------------->",username, password);
//     console.log("-------------->this", that);
//     // return bcrypt.compareSync(model.get('hash'), password);

//     // .tap(function (user) {
//     //   console.log("######");
//     //   console.log("User test: "+ bcrypt.compareAsync(user.get('hash'), password));
//     //   return bcrypt.compareAsync(user.get('hash'), password);
//     // });
//   }
// };

module.exports = User;

