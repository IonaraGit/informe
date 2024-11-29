const express = require('express')
const router = express.Router()

router.get ('/sobrenos', (req, res) => {
  res.render('sobrenos');
});

module.exports = router