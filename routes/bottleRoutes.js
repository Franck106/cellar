const express = require('express');
const bottleController = require('../controllers/bottleController');

const router = express.Router();

router.param('id', bottleController.checkId);

router
  .route('/')
  .get(bottleController.getAllBottles)
  .post(bottleController.checkBody, bottleController.createBottle);

router.route('/:id').get(bottleController.getBottle);

module.exports = router;
