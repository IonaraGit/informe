const express = require('express')
const router = express.Router()

router.get ('/vereadores', (req, res) => {
  res.render('vereadores');
});

module.exports = router