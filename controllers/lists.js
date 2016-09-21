var express = require('express');
var router = express.Router();

var List = require('../models/list');

// INDEX
router.get('/', function(req, res){
  List.find(function(error, lists){
    if(error) return res.status(404).send({message: 'Could not find any lists'})
    return res.status(200).send(lists);
  });
});

// SHOW
router.get('/:id', function(req, res){
  List.findById({_id: req.params.id})
  .populate('items')
  .exec(function(error, list){
    if(error) return res.status(404).send({message: 'Could not find list'})
    return res.status(200).send(list);
  });
});

// POST
router.post('/', function(req, res){
  var list = new List(req.body);
  list.save(function(error, list){
    if(error) return res.status(403).send({message: 'Could not add list b/c' + error});
    return res.status(200).send(list);
  });
});

// UPDATE
router.put('/:id', function(req, res) {
    List.findByIdAndUpdate(req.params.id, req.body, function(error){
      if(error) return res.status(403).send({message: 'Could not update list b/c' + error});
      return res.status(200);
    });
});

// DELETE
router.delete('/:id', function(req, res){
  var id = req.params.id;
  List.remove({_id: id}, function(error){
    if (error) res.status(404).send({message: 'No list with that ID. Could not delete.'})
    return res.status(204).send({message: 'Deleted!'});
  });
});

module.exports = router