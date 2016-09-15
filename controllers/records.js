var express = require('express');
var router = express.Router();

var Record = require('../models/record');

// INDEX
router.get('/', function(req, res){
  Record.find(function(error, records){
    if(error) return res.status(404).send({message: 'Could not find any records'})
    return res.status(200).send(records);
  });
});

// SHOW
router.get('/:id', function(req, res){
  Record.findById({_id: req.params.id})
  // .populate('country')
  .exec(function(error, lists){
    if(error) return res.status(404).send({message: 'Could not find any lists'})
    return res.status(200).send(lists);
  })
});

// POST
router.post('/', function(req, res){
  var record = new Record(req.body);
  record.save(function(error, record){
    if(error) return res.status(403).send({message: 'Could not add record b/c' + error});
    return res.status(200).send(record);
  });
});

// UPDATE
router.put('/:id', function(req, res) {
    Record.findByIdAndUpdate(req.params.id, req.body, function(error){
      if(error) return res.status(403).send({message: 'Could not update record b/c' + error});
      return res.status(200);
    });
});

// SAVE ORDER
router.post('/saveOrder', function(req, res) {
  var data = req.body.data;
  data.forEach(function(value, index) {
    var id = value;
    var rank = index;
    Record.findByIdAndUpdate({_id: id}, { rank: rank }, function(error){
      if(error) return res.status(403).send({message: 'Could not update record order b/c' + error});
      return res.status(200);
    });
  });
});

// DELETE
router.delete('/:id', function(req, res){
  var id = req.params.id;
  Record.remove({_id: id}, function(error){
    if (error) res.status(404).send({message: 'No record with that ID. Could not delete.'})
    return res.status(204).send({message: 'Deleted!'});
  });
});

module.exports = router