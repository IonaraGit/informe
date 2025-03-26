const { DataTypes } = require('sequelize');
const connection = require('../database/database');

const User = connection.define('users', {
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [2, 100] // Nome entre 2 e 100 caracteres
    }
  },
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true, // Evita duplicação de e-mails
    validate: {
      isEmail: true // Garante que é um e-mail válido
    }
  }
}, {
  timestamps: true // Cria automaticamente `createdAt` e `updatedAt`
});

// Hook para formatar nome antes de salvar
User.beforeCreate((user) => {
  user.first_name = user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1).toLowerCase();
  user.last_name = user.last_name.charAt(0).toUpperCase() + user.last_name.slice(1).toLowerCase();
});

User.sync({ force: false });

module.exports = User;
