var mongoose = require('mongoose');
var ListItem = require('./listItem');

var ImageSchema = new mongoose.Schema({
  path: String,
  mediaFolder: { type: mongoose.Schema.ObjectId, ref: 'ListItem' },
  title: String,
  caption: String,
  alternateText: String,
  mediaCredits: String,
  copyright: String,
  titleInContext: String,
  alternateTextInContext: String,
  active: Boolean,
  fileSize: String
});

var Image = mongoose.model("Image", ImageSchema);
module.exports = Image;