const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')

// View Engine
app.set('view engine', 'ejs')

//Static 
app.use(express.static('public'))

// Body Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Routes
const LoginRoutes = require('./routes/LoginRoutes')
const ObrasRoutes = require('./routes/ObrasRoutes')
const TurismoRoutes = require('./routes/TurismoRoutes')
const SecretariasRoutes = require('./routes/SecretariasRoutes')
const EventosRoutes = require('./routes/EventosRoutes')
const PrefeitoRoutes = require('./routes/PrefeitoRoutes')
const VagasRoutes = require('./routes/VagasRoutes')

//Database
connection.authenticate()
  .then(() =>{
    console.log('Conectado com o banco!')
  }).catch ((err) => {
    console.log('Erro ao conectar com banco: ', err)
  })

app.get('/', (req,res) => {
  res.render('index')
})

app.use('/', LoginRoutes)
app.use('/', ObrasRoutes)
app.use('/', LoginRoutes)
app.use('/', TurismoRoutes)
app.use('/', SecretariasRoutes)
app.use('/', EventosRoutes)
app.use('/', PrefeitoRoutes)
app.use('/', VagasRoutes)

app.listen(8080, () => {
  console.log('Servidor Rodando!')
})