const express = require ('express')
const router = express.Router();
const User = require('../models/User');
const Subject = require('../models/Subject');
const File = require('../models/File');
const Login = require('../models/Login')
const upload = require('../multer/multerConfig')
const bcrypt = require('bcrypt');


router.post('/login', async (req, res) => {
  try {
    const { record, password } = req.body;

    // Verifica se o usuário existe no banco
    const user = await Login.findOne({ where: { record } });

    if (!user) {
      req.session.message = 'Registro não encontrado ou não autorizado.';
      return res.redirect('/login');
    }

    // Compara a senha fornecida com a senha criptografada no banco
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      req.session.message = 'Senha incorreta.';
      return res.redirect('/login');
    }

    // Salva o usuário na sessão e redireciona para a área admin
    req.session.user = user;
    res.redirect('/admin');

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao tentar logar' });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.redirect('/admin'); // Se der erro, mantém na página
    }
    res.redirect('/login'); // Redireciona para a tela de login após logout
  });
});

module.exports = router