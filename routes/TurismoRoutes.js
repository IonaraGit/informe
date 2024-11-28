const express = require('express')
const router = express.Router()

router.get ('/turismo', (req, res) => {
  res.render('turismo');
});

module.exports = router