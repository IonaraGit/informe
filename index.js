const express = require('express')
const path = require('path');
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')

//Controllers
const FormControllers = require('./controllers/FormControllers')

//Models
const User = require('./models/User')
const File = require('./models/File')
const Subject = require('./models/Subject')

// View Engine
app.set('view engine', 'ejs')

//Static
app.use(express.static('public'))

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes
const LoginRoutes = require('./routes/LoginRoutes')
const ObrasRoutes = require('./routes/ObrasRoutes')
const TurismoRoutes = require('./routes/TurismoRoutes')
const SecretariasRoutes = require('./routes/SecretariasRoutes')
const EventosRoutes = require('./routes/EventosRoutes')
const PrefeitoRoutes = require('./routes/PrefeitoRoutes')
const VagasRoutes = require('./routes/VagasRoutes')
const TelefonesRoutes = require('./routes/TelefonesRoutes')
const SobreNosRoutes = require('./routes/SobreNosRoutes')
const ExpressoSaltoRoutes = require('./routes/ExpressoSaltoRoutes')
const VereadoresRoutes = require('./routes/VereadoresRoutes')
const SimbolosRoutes = require('./routes/SimbolosRoutes')
const FaleConosco = require('./routes/FaleConoscoRoutes')


//Database
connection
  .authenticate()
  .then(() => {
    console.log('Conectado com o banco!')
  })
  .catch(err => {
    console.log('Erro ao conectar com banco: ', err)
  })

app.get('/', (req, res) => {
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
app.use('/', TelefonesRoutes)
app.use('/', SobreNosRoutes)
app.use('/', ExpressoSaltoRoutes)
app.use('/', VereadoresRoutes)
app.use('/', SimbolosRoutes)
app.use('/', FaleConosco)

app.use('/', FormControllers)

app.listen(8081, () => {
  console.log('Servidor Rodando! - 8081')
})
