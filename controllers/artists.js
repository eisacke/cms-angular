var express = require('express');
var router = express.Router();

var Artist = require('../models/artist');

// INDEX
router.get('/', function(req, res){
  Artist.find(function(error, artists){
    if(error) return res.status(404).send({message: 'Could not find any artists'})
    return res.status(200).send(artists);
  });
});

// SHOW
router.get('/:id', function(req, res){
  Artist.findById({_id: req.params.id})
  // .populate('country')
  .exec(function(error, artists){
    if(error) return res.status(404).send({message: 'Could not find any artists'})
    return res.status(200).send(artists);
  })
});

// POST
router.post('/', function(req, res){
  var artist = new Artist(req.body);
  artist.save(function(error, artist){
    if(error) return res.status(403).send({message: 'Could not add artist b/c' + error});
    return res.status(200).send(artist);
  });
});

// UPDATE
router.put('/:id', function(req, res) {
    Artist.findByIdAndUpdate(req.params.id, req.body, function(error){
      if(error) return res.status(403).send({message: 'Could not update artist b/c' + error});
      return res.status(200);
    });
});

// SAVE ORDER
router.post('/saveOrder', function(req, res) {
  var data = req.body.data;
  data.forEach(function(value, index) {
    var id = value;
    var rank = index;
    Artist.findByIdAndUpdate({_id: id}, { rank: rank }, function(error){
      if(error) return res.status(403).send({message: 'Could not update artist order b/c' + error});
      return res.status(200);
    });
  });
});

// DELETE
router.delete('/:id', function(req, res){
  var id = req.params.id;
  Artist.remove({_id: id}, function(error){
    if (error) res.status(404).send({message: 'No artist with that ID. Could not delete.'})
    return res.status(204).send({message: 'Deleted!'});
  });
});

module.exports = router