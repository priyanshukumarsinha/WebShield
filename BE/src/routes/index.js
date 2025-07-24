const express = require('express');
const scoreController = require('../controllers/scoreController');
const { validateDomain } = require('../middleware/validation');

const router = express.Router();

// Domain score endpoint
router.get('/score', validateDomain, scoreController.getDomainScore);

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = router;