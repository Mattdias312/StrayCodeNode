const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const loginRoute = require('./src/route/loginRoute');
const questionarioRoute = require('./src/route/questionarioRoute');
const mongoose = require('mongoose');
const port = 3000;
const dotenv = require('dotenv');

dotenv.config();

console.log(process.env.MONGO_URI)

const {MONGO_URI} = process.env

let url = MONGO_URI ;
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true, // Habilita SSL
    tlsAllowInvalidCertificates: true // Ignora certificados inválidos (somente em dev)
  }).then(() => {
    console.log('Conectado ao MongoDB com sucesso!');
  }).catch((error) => {
    console.error('Erro ao conectar com o MongoDB:', error);
  });
  
let mongodb = MONGO_URI || url;
mongoose.connect(mongodb);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error',console.error.bind(console, 'error ao conectar com a base de dados'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extendde: false}));
app.use(loginRoute);
app.use(questionarioRoute);


app.listen(port, () => {
    console.log('Servidor em execução na porta 3000');
});
