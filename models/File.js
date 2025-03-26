const { DataTypes } = require('sequelize');
const connection = require('../database/database');
const Subject = require('./Subject'); // Importando o modelo de assunto

const File = connection.define('files', {
  file_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      len: [1, 255] // Nome do arquivo pode ter até 255 caracteres
    }
  },
  file_type: {
    type: DataTypes.STRING(500), // Caminho do arquivo no servidor
    allowNull: false
  },
  file_url: {
    type: DataTypes.STRING(500), // Caminho completo ou URL do arquivo
    allowNull: false
  }
}, {
  timestamps: true // Cria automaticamente `createdAt` e `updatedAt`
});

// Relacionamento 1:N: Um assunto pode ter vários arquivos
File.belongsTo(Subject, {
  foreignKey: 'subject_id',
  onDelete: 'CASCADE' // Se o assunto for excluído, os arquivos também serão excluídos
});

File.sync({ force: false });

module.exports = File;
