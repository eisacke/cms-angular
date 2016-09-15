var mongoose = require('mongoose');

var ListItem = require('./listItem');
var Artist = require('./artist');

var ExhibitionSchema = new mongoose.Schema({
  title: String,
  openingDate: Date,
  closingDate: Date,
  active: Boolean,
  people: [
  	{
  		personId: { type: mongoose.Schema.ObjectId, ref: 'Artist' },
  		role: { type: mongoose.Schema.ObjectId, ref: 'ListItem' },
      active: Boolean
  	}
  ]
});

var Exhibition = mongoose.model("Exhibition", ExhibitionSchema);
module.exports = Exhibition;