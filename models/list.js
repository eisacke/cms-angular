var mongoose = require('mongoose');

var ListItem = require('./listItem');

var ListSchema = new mongoose.Schema({
  title: String,
  items: [{ type: mongoose.Schema.ObjectId, ref: 'ListItem'}],
  active: Boolean
});

var List = mongoose.model("List", ListSchema);
module.exports = List;