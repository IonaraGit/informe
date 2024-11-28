const express = require('express')
const router = express.Router()

router.get ('/obras', (req, res) => {
  res.render('obras');
});

module.exports = router