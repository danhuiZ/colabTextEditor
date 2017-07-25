var mongoose = require('mongoose');



var userSchema = mongoose.Schema({
  username: String,
  passport: String,
  documents: Array    //array of document ids that user has access to. Own or collab, ref to document
});

var documentSchema = mongoose.Schema({
  title: String,
  ownerIDs: Array,
  collaboratorIDs: Array,
  hashedpassword: String
});


var User = mongoose.model('User', userSchema);
var Document = mongoose.model('Document', documentSchema);

module.exports = {
  User, Document
};
