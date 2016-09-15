var mongoose = require('mongoose');

var ArtistSchema = new mongoose.Schema({
  name: String,
  active: Boolean
});

var Artist = mongoose.model("Artist", ArtistSchema);
module.exports = Artist;