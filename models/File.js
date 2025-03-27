const { DataTypes } = require('sequelize')
const connection = require('../database/database')
const Subject = require('../models/Subject')

const File = connection.define(
  'files',
  {
    file_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    file_type: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    file_url: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  },
  {
    timestamps: true // Cria automaticamente `createdAt` e `updatedAt`
  }
)

Subject.hasMany(File) 
File.belongsTo(Subject)

File.sync({ force: false })
module.exports = File
