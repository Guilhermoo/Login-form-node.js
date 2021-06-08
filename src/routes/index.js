const express = require('express');
// passport
const passport = require('passport')
const router = express.Router();


// Rotas

//Rota padrão
router.get('/', (req, res, next) => {
    res.render('index')
});
// Rota de registro
router.get('/registro', (req, res, next) => {
    res.render('registro');
});
//rota de post do registro
router.post('/registro', passport.authenticate('local-registro', {
    successRedirect: '/perfil',
    failureRedirect: '/registro',
    passReqToCallback: true
}));

/* |||*/

// Rota de login 
router.get('/login', (req, res, next) => {
    res.render('login')
});
//rota de post do login
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/perfil',
    failureRedirect: '/login',
    passReqToCallback: true
}));

// Logout
router.get('/logout', (req,res,next)=>{
    req.logout();
    res.redirect('/');
});


// rota de perfil

router.get('/perfil', isAuthenticated,(req,res,next)=>{
    res.render('perfil')
});

function isAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        console.log('Esta autenticado')
        return next()
    } else {
        console.log('Não esta autenticado')
        res.redirect('/');
    }
    }



module.exports = router;
