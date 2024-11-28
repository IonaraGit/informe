const express = require('express')
const router = express.Router()

router.get ('/eventos', (req, res) => {
  res.render('eventos');
});

module.exports = router