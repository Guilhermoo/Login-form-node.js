const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const userSchema = new Schema({
    email: String,
    senha: String
});

userSchema.methods.encryptSenha = (senha) => {
   return bcrypt.hashSync(senha, bcrypt.genSaltSync(10));  
};

userSchema.methods.compareSenha = function (senha) {
    return bcrypt.compareSync(senha, this.senha);
}

module.exports = mongoose.model('users', userSchema)
