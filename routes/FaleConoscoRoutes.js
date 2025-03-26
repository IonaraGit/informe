const express = require('express');
const router = express.Router();
const FaleConoscoController = require('../controllers/FormControllers'); // Importe o controlador

// Exibe o formulário
router.get('/faleconosco', (req, res) => {
  res.render('faleconosco');
});

module.exports = router;
