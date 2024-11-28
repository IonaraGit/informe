const express = require('express')
const router = express.Router()

router.get ('/secretarias', (req, res) => {
  res.render('secretarias');
});

module.exports = router