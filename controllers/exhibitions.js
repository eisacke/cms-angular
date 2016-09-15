var express = require('express');
var router = express.Router();

var Exhibition = require('../models/exhibition');
var ObjectId = require('mongoose').Types.ObjectId;

// INDEX
router.get('/', function(req, res){
  Exhibition.find(function(error, exhibitions){
    if(error) return res.status(404).send({message: 'Could not find any exhibitions'})
    return res.status(200).send(exhibitions);
  });
});

// SHOW
router.get('/:id', function(req, res){
  Exhibition.findById({_id: req.params.id})
  .populate('people.personId people.role')
  .exec(function(error, lists){
    if(error) return res.status(404).send({message: 'Could not find any lists'})
    return res.status(200).send(lists);
  })
});

// POST
router.post('/', function(req, res){
  var exhibition = new Exhibition(req.body);
  exhibition.save(function(error, exhibition){
    if(error) return res.status(403).send({message: 'Could not add exhibition b/c' + error});
    return res.status(200).send(exhibition);
  });
});

// UPDATE
router.put('/:id', function(req, res) {
    Exhibition.findByIdAndUpdate(req.params.id, req.body, function(error){
      if(error) return res.status(403).send({message: 'Could not update exhibition b/c' + error});
      return res.status(200);
    });
});

// UPDATE PERSON RELATIONSHIP
router.put('/update/person', function(req, res) {
  Exhibition.findByIdAndUpdate(req.body.exhibitionId, {
    $pull: {
      people: {_id: new ObjectId(req.body._id)}
    }
  }, function(error, exhibition) {
      if(error) return res.status(403).send({message: 'Could not update exhibition b/c' + error});
      return res.status(200);
  });
});

// DELETE
router.delete('/:id', function(req, res){
  var id = req.params.id;
  Exhibition.remove({_id: id}, function(error){
    if (error) res.status(404).send({message: 'No exhibition with that ID. Could not delete.'})
    return res.status(204).send({message: 'Deleted!'});
  });
});

module.exports = router