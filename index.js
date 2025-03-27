const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')
const session = require('express-session');

// Sessão
app.use(session({
  secret: "seuSegredoSuperSecreto", // Alterar para um segredo forte
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Defina como `true` se estiver usando HTTPS
}));
// Servir arquivos estáticos da pasta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Controllers
const FormControllers = require('./controllers/FormControllers')
const LoginControllers = require('./controllers/LoginControllers')

//Models
const User = require('./models/User')
const Subject = require('./models/Subject')
const File = require('./models/File')
const Login = require('./models/Login')

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
const AdminRoutes = require('./routes/AdminRoutes')

//Database
// Sincronize os modelos
connection
  .sync({ force: false })
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso!')
  })
  .catch(err => {
    console.error('Erro ao sincronizar as tabelas:', err)
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
app.use('/', AdminRoutes)

app.use('/', FormControllers)
app.use('/', LoginControllers)

app.listen(8081, () => {
  console.log('Servidor Rodando! - 8081')
})
