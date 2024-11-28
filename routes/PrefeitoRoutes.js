const express = require('express')
const router = express.Router()

router.get ('/prefeito', (req, res) => {
  res.render('prefeito');
});

module.exports = router