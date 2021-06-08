//Morgan
const morgan = require('morgan');
// Path
const path = require('path')
// EXPRESS
const express = require('express');
//EJS
const engine = require('ejs-mate');
//Rotas
const rotaPrincipal = require('./routes/index');
//Passport
const passport = require('passport');
//Express-session 
const session = require('express-session');
// flash
const flash = require('connect-flash')

// Init
const app = express();
require('./db');
require('./passport/local-auth');

// Configurações
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs')

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret: 'mysecretsession',
    resave:false,
    saveUninitialized:false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next)=>{
     app.locals.registroMsg = req.flash('registroMsg');
     app.locals.loginMsg = req.flash('loginMsg');
     app.locals.senhaMsg = req.flash('senhaMsg');
     app.locals.user = req.user;
     next();
});

// Config Rotas
app.use('/', rotaPrincipal);

// Startando o servidor
app.listen(8000, () =>{
    console.log('server ON')
})