const express = require("express"); //Ela contem todas as funcionalidades do express; 
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

// app.use(cors({
//     origin: 'www.meuapp.com' //colocar o endereço da hospedagem 
// }))

app.use(cors()); // assim permite q todos acessem

const bodyParser = require('body-parser');
//Declarando q todas as requisições serão com corpo json
//Use o use toda vez q for referenciar o uso de algo.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(routes); 
app.use(errors());


app.listen(process.env.PORT || 3333);