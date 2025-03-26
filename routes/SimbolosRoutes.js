const express = require('express')
const router = express.Router()

router.get ('/simbolos', (req, res) => {
  res.render('simbolos');
});

module.exports = router