var mongoose = require('mongoose');

var ListItemSchema = new mongoose.Schema({
  title: String,
  active: Boolean,
  rank: Number
});

var ListItem = mongoose.model("ListItem", ListItemSchema);
module.exports = ListItem;