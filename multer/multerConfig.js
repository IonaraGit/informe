const multer = require('multer');
const path = require('path');

// Configuração do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Pasta onde os arquivos serão salvos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nome único para os arquivos
  }
});

// Criando o middleware do Multer
const upload = multer({ storage: storage });

// Exportando o middleware para uso nas rotas
module.exports = upload;
