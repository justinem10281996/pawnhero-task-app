const express = require('express');
const router = express.Router();

const {
  getStatuses
} = require('../controller/statusController');

// routes
router.get('/', getStatuses);

module.exports = router;