const { DataTypes } = require('sequelize')
const connection = require('../database/database')

const User = connection.define(
  'users',
  {
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
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
    }
  },
  {
    timestamps: true // Cria automaticamente `createdAt` e `updatedAt`
  }
)

// Hook para formatar nome antes de salvar (maiúsculos)
User.beforeCreate(user => {
  user.first_name = user.first_name.toUpperCase();
  user.last_name = user.last_name.toUpperCase();
});

User.sync({ force: false })

module.exports = User
