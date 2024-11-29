const express = require('express')
const router = express.Router()

router.get ('/faleconosco', (req, res) => {
  res.render('faleconosco');
});

module.exports = router