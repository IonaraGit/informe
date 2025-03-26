const { DataTypes } = require('sequelize');
const connection = require('../database/database');
const User = require('./User'); // Importando o modelo de usuário

const Subject = connection.define('subjects', {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [3, 100] // Tamanho entre 3 e 100 caracteres
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true // Descrição é opcional
  }
}, {
  timestamps: true // Cria automaticamente `createdAt` e `updatedAt`
});

// Relacionamento 1:N: Um usuário pode ter vários assuntos
Subject.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE' // Se o usuário for excluído, os assuntos também serão excluídos
});

Subject.sync({ force: false });

module.exports = Subject;
