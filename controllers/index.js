var express = require('express');
var router = express.Router();

router.use('/upload', require('./uploader'));
router.use('/api/records', require('./records'));
router.use('/api/artists', require('./artists'));
router.use('/api/lists', require('./lists'));
router.use('/api/listItems', require('./listItems'));
router.use('/api/exhibitions', require('./exhibitions'));

router.get('/', function(req, res) {
  res.render("index.html");
});

module.exports = router;