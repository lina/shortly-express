var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
console.log("IS THIS BEING RUN??????????@@@@@@@@@@@@");
var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  links: function() {
    return this.hasMany(Link);
  },


  initialize: function() {
    this.on('creating', function(model, attrs, options) {
      console.log("------->attrs", model);

      var hash = hashPassword()
    })
    this.on('saving', this.generateHash);
  },

  generateHash: function() {
    return;
  },


}, {

  // login: Promise.method(function(email, password) {
  //   if (!email || !password) throw new Error('Email and password are both required');
  //   return new this({email: email.toLowerCase().trim()}).fetch({require: true}).tap(function(user) {
  //     return bcrypt.compareAsync(user.get('password'), password);
  //   });
  // })
});

// User.login(email, password)
//   .then(function(user) {
//     res.json(user.omit('password'));
//   }).catch(User.NotFoundError, function() {
//     res.json(400, {error: email + ' not found'});
//   }).catch(function(err) {
//     console.error(err);
//   });
// module.exports = User;



exports.hashPassword = function (input) {
  var hash = bcrypt.hashSync(input);
  return { 
    hash: hash
  };
};

exports.compare = function (input, hash) {
  return bcrypt.compareSync(input, hash);
};