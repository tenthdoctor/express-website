/**
 * Created by doctor on 25/10/15.
 */

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost/nodeauth');
var db = mongoose.connection;

// User Schema

var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String, required: true, bcrypt: true
    },
    email: {
        type: String
    },
    name: {
        name: String
    },
/*    profileImage: {
        name: String
    }*/

});

var FaceBookUserSchema = mongoose.Schema({
    fbId: {
        type: String
    },
    email: {
        type : String,
        lowercase : true
    },
    name : {
        type: String
    }
});


var User = module.exports = mongoose.model('User', UserSchema);
var FbUser = module.exports = mongoose.model('fbs', FaceBookUserSchema);

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch){
      if(err) return callback(err);
      callback(null, isMatch);
  });
};

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
};

module.exports.createUser = function(newUser, callback){
    bcrypt.hash(newUser.password, 10, function(err, hash){
        if(err) throw err;
        //Set Hashsed Password
        newUser.password = hash;
        //Create User
        newUser.save(callback);
    });
};