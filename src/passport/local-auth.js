const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users');

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser(async(id, done)=>{
    const user = await User.findById(id);
    done(null, user)
})
// autenticação de registro
passport.use('local-registro', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'senha',
    passReqToCallback:true
}, async (req, email, senha, done) =>{

    const user = await User.findOne({email:email});
    if(user) {
        return done(null, false, req.flash('registroMsg', 'Esse email já existe em nosso banco de dados.'))
    } else {
        const newUser = new User();
        newUser.email = email;
        newUser.senha = newUser.encryptSenha(senha);
        await newUser.save();
        done(null, newUser)
    }
}));

// Autenticação  de Login
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'senha',
    passReqToCallback: true
}, async (req, email, senha, done)=>{
    
    const user = await User.findOne({email:email});
    if (!user){
        return done(null, false, req.flash('loginMsg', 'Usuario não encontrado'))
    }
    if (!user.compareSenha(senha)){
        return done(null, false, req.flash('senhaMsg', 'Senha incorreta'))
    }
    done(null, user)

}));