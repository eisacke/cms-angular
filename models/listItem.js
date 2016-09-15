var mongoose = require('mongoose');

var ListItemSchema = new mongoose.Schema({
  title: String,
  active: Boolean
});

var ListItem = mongoose.model("ListItem", ListItemSchema);
module.exports = ListItem;