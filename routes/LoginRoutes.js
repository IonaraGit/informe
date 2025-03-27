const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login', { message: req.session.message });
});


module.exports = router