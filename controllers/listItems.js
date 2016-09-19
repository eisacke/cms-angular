var express = require('express');
var router = express.Router();

var List = require('../models/list');
var ListItem = require('../models/listItem');

// INDEX
router.get('/', function(req, res){
  ListItem.find(function(error, listItems){
    if(error) return res.status(404).send({message: 'Could not find any listItems'})
    return res.status(200).send(listItems);
  });
});

// SHOW
// router.get('/:id', function(req, res){
//   var id = req.params.id;
//   ListItem.findById({_id: id}, function(error, listItem){
//     if(error) return res.status(404).send({message: 'Could not find listItem'})
//     return res.status(200).send(listItem);
//   });
// });

router.get('/:id', function(req, res){
  var id = req.params.id;
  ListItem.findById({_id: id})
  .populate('country')
  .exec(function(error, listItem){
    if(error) return res.status(404).send({message: 'Could not find listItem'})
    return res.status(200).send(listItem);
  });
});

// POST
router.post('/', function(req, res){
  var listItem = new ListItem(req.body);
  listItem.active = true;
  listItem.save(function(error, listItem){
    List.findByIdAndUpdate({_id: req.body.listId}, {$push: {"items": listItem._id}}, function(error, list){
      if (error) return res.status(403).send({message: "Failed add list item to list"});
      return res.status(200).send(list);
    });
  });
});

// UPDATE
router.put('/:id', function(req, res) {
    ListItem.findByIdAndUpdate(req.params.id, req.body, function(error){
      if(error) return res.status(403).send({message: 'Could not update listItem b/c' + error});
      return res.status(200);
    });
});

// DELETE
router.delete('/:id', function(req, res){
  var id = req.params.id;
  ListItem.remove({_id: id}, function(error){
    if (error) res.status(404).send({message: 'No listItem with that ID. Could not delete.'})
    return res.status(204).send({message: 'Deleted!'});
  });
});

// SAVE ORDER
router.post('/saveOrder', function(req, res) {
  var data = req.body.data;
  data.forEach(function(value, index) {
    var id = value;
    var rank = index;
    ListItem.findByIdAndUpdate({_id: id}, { rank: rank }, function(error){
      if(error) return res.status(403).send({message: 'Could not update listItem order b/c' + error});
      return res.status(200);
    });
  });
});

module.exports = router