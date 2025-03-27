const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Subject = require('../models/Subject');
const File = require('../models/File');
const Login = require('../models/Login')
const bcrypt = require('bcrypt');


router.get('/admin', async (req, res) => {
  try {
    // Verifica se o usuário está logado
    if (!req.session.user) {
      return res.redirect('/login'); // Redireciona para o login se não estiver autenticado
    }

    // Pega os dados do usuário logado da sessão
    const loggedUser = req.session.user;

    // Buscar todos os subjects
    const subjects = await Subject.findAll();

    // Criar um array para armazenar os usuários correspondentes
    const subjectsWithUser = [];

    for (let subject of subjects) {
      // Buscar o usuário associado ao subject
      const user = await User.findByPk(subject.userId);

      // Adiciona o usuário ao assunto
      subject.User = user;
      subjectsWithUser.push(subject);
    }

    // Buscar todos os arquivos
    const files = await File.findAll();

    // Organizando os arquivos por subjectId
    const filesBySubject = {};
    files.forEach(file => {
      if (!filesBySubject[file.subjectId]) {
        filesBySubject[file.subjectId] = [];
      }
      filesBySubject[file.subjectId].push(file);
    });

    // Passando os dados para a view, incluindo o usuário logado
    res.render('admin', { 
      user: loggedUser, // Envia os dados do usuário logado para a view
      subjects: subjectsWithUser, 
      filesBySubject 
    });

  } catch (error) {
    console.error(error);
    res.send('Erro ao carregar os relatórios');
  }
});


router.post('/admin/update-password', async (req, res) => {
  try {
    const { record, oldPassword, newPassword, confirmPassword } = req.body;

    // Verifica se as novas senhas são iguais
    if (newPassword !== confirmPassword) {
      return res.render('admin', { message: 'As novas senhas não coincidem.' });
    }

    // Encontrar o usuário pelo 'record' (registro)
    const user = await Login.findOne({ where: { record } });

    if (!user) {
      return res.render('admin', { message: 'Usuário não encontrado.' });
    }

    // Verifica se a senha antiga está correta
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.render('admin', { message: 'Senha atual incorreta.' });
    }

    // Se tudo estiver certo, atualiza a senha
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedNewPassword;
    await user.save();

    // Redireciona com uma mensagem de sucesso
    res.render('admin', { message: 'Senha atualizada com sucesso.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar a senha.' });
  }
});

module.exports = router;
