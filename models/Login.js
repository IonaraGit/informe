const { DataTypes } = require('sequelize')
const connection = require('../database/database')

const Login = connection.define(
  'logins',
  {
    record: { 
      type: DataTypes.STRING(100),
      allowNull:false
    },
    password: { 
      type: DataTypes.STRING(100),
      allowNull:false
    }
  },
)

Login.sync({force: false})
module.exports = Login