const mongoose = require('mongoose');
const { mongodb } = require('./keys');
mongoose.connect(mongodb.URI, {useNewUrlParser:true, 
    useUnifiedTopology:true}).then((db)=>{
    console.log('Banco de dados conectdo')
}).catch((erro)=>{
    console.log('Deu ruim' + erro)
})