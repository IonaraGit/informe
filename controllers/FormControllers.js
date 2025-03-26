const User = require('../models/User');
const Subject = require('../models/Subject');
const File = require('../models/File');
const express = require('express')
const router = express.Router()


router.post('/form-salvar', async (req, res) => {
  try {
    const { first_name, last_name, phone, email, subject_name, subject_description } = req.body;

    console.log("veio:", first_name, last_name, phone, email, 'nome aquivo:',subject_name, subject_description )

    // Criando o usuário e capturando o ID
    const user = await User.create({
      first_name,
      last_name,
      phone,
      email
    });

    // Criando o assunto e associando ao usuário criado
    const subject = await Subject.create({
      name: subject_name,
      description: subject_description,
      user_id: user.id  // Pegando o ID do usuário criado
    });

    const file = await File.create({
      
    })

    res.send('Formulário salvo com sucesso!');
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});


module.exports = router
