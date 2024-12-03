const express = require('express')
const router = express.Router()

router.get ('/expressosalto', (req, res) => {
  res.render('expressosalto');
});

module.exports = router