var express = require('express');
var router = express.Router();

var Image = require('../models/image');
var ObjectId = require('mongoose').Types.ObjectId;

// INDEX
router.get('/', function(req, res){
  Image.find(function(error, images){
    if(error) return res.status(404).send({message: 'Could not find any images'})
    return res.status(200).send(images);
  });
});

// SHOW
router.get('/:id', function(req, res){
  Image.findById({_id: req.params.id})
  .populate('people.personId people.role')
  .exec(function(error, lists){
    if(error) return res.status(404).send({message: 'Could not find any lists'})
    return res.status(200).send(lists);
  })
});

// POST
router.post('/', function(req, res){
  var image = new Image(req.body);
  image.save(function(error, image){
    if(error) return res.status(403).send({message: 'Could not add image b/c' + error});
    return res.status(200).send(image);
  });
});

// UPDATE
router.put('/:id', function(req, res) {
    Image.findByIdAndUpdate(req.params.id, req.body, function(error){
      if(error) return res.status(403).send({message: 'Could not update image b/c' + error});
      return res.status(200);
    });
});

// DELETE
router.delete('/:id', function(req, res){
  var id = req.params.id;
  Image.remove({_id: id}, function(error){
    if (error) res.status(404).send({message: 'No image with that ID. Could not delete.'})
    return res.status(204).send({message: 'Deleted!'});
  });
});


// UPDATE PERSON RELATIONSHIP (delete)
router.put('/update/person', function(req, res) {
  Image.findByIdAndUpdate(req.body.imageId, {
    $pull: {
      people: {_id: new ObjectId(req.body._id)}
    }
  }, function(error, image) {
      if(error) return res.status(403).send({message: 'Could not update image b/c' + error});
      return res.status(200);
  });
});

module.exports = router