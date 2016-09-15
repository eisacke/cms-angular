var mongoose = require('mongoose');

var ListItem = require('./listItem');
var Artist = require('./artist');

var RecordSchema = new mongoose.Schema({
  title: String,
  type: String,
  material: String,
  acquisition: String,
  country: { type: mongoose.Schema.ObjectId, ref: 'ListItem' },
  artists: [{ type: mongoose.Schema.ObjectId, ref: 'Artist' }],
  active: Boolean,
  tags: []
});

var Record = mongoose.model("Record", RecordSchema);
module.exports = Record;