const express = require ('express')
const router = express.Router();
const User = require('../models/User');
const Subject = require('../models/Subject');
const File = require('../models/File');
const upload = require('../multer/multerConfig')


// Salvar formulário
router.post('/save-form', upload.array('files'), async (req, res) => {
  try {
    const { first_name, last_name, phone, email, subject_name, subject_description } = req.body;
    const files = req.files;  // Agora você pode acessar os arquivos enviados

    console.log('DADOS QUE VIERAM: ', first_name, last_name, phone, email, subject_name, subject_description, files);

    // Criando o usuário
    const user = await User.create({
      first_name,
      last_name,
      phone,
      email
    });

    // Criando o assunto relacionado ao usuário
    const subject = await Subject.create({
      subject_name,
      subject_description,
      userId: user.id // Relacionando com o usuário criado
    });

    // Processando e salvando os arquivos
    if (files && files.length > 0) {
      for (const file of files) {
        await File.create({
          file_name: file.originalname, // Nome do arquivo
          file_type: file.mimetype, // Tipo de arquivo
          file_url: `/uploads/${file.filename}`, // Caminho do arquivo
          subjectId: subject.id // Relacionando os arquivos ao assunto
        });
      }
    }

    const message = 'SALVO!'
    res.render('faleconosco', {message: message});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao salvar dados' });
  }
});


module.exports = router;
