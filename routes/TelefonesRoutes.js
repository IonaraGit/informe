const express = require('express')
const router = express.Router()

router.get ('/telefones', (req, res) => {
  res.render('telefones');
});

module.exports = router