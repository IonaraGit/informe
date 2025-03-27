const { DataTypes } = require('sequelize')
const connection = require('../database/database')
const User = require('./User')

const Subject = connection.define(
  'subjects',
  {
    subject_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [2, 100] //Entre 2 e 100 caracteres
      }
    },
    subject_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  },
  {
    timestamps: true // Cria automaticamente `createdAt` e `updatedAt`
  }
)

User.hasMany(Subject) 
Subject.belongsTo(User) 

// Hook para formatar nome antes de salvar (maiúsculos)
Subject.beforeCreate(subject => {
  subject.subject_name = subject.subject_name.toUpperCase();
  subject.subject_description = subject.subject_description.toUpperCase();
})

Subject.sync({ force: false })

module.exports = Subject
