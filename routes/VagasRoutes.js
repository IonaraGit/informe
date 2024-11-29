const express = require('express')
const router = express.Router()

router.get ('/vagas', (req, res) => {
  res.render('vagas');
});

module.exports = router