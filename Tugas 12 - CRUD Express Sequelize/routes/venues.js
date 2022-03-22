var express = require('express');
var router = express.Router();

const venuesController = require('../controllers/venues')

/* GET venues listing. */
router.get('/', venuesController.findAll);
router.post('/', venuesController.store);
router.get('/:id', venuesController.show);
router.put('/:id/', venuesController.update);
router.delete('/:id', venuesController.delete);
router.delete('/', venuesController.dropData);

module.exports = router;
