const Sequelize = require('sequelize')
const connection = new Sequelize('informe', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
})

module.exports = connection