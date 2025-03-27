const express = require('express')
const router = express.Router()
const User = require('../models/User')

// Exibe o formulário
router.get('/faleconosco', (req, res) => {
  const message = ''
  res.render('faleconosco', {message: message})
})



module.exports = router
