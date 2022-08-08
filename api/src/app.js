
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');

require('./db.js');

const app = express();
const cors = require('cors');
app.name = 'API';

app.use(cors());
//Para poder parsear los archivos json de forma correcta
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
//Da un output en la consola cada que se hace una request
app.use(morgan('dev'));
//app.use((req, res, next) => {
  //  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    //res.header('Access-Control-Allow-Credentials', 'true');
    //res.header('Access-Control-Allow-Headers', '*');
    //res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    //next();
//});


app.use('/', routes);

// Aquí seteamos el manejo de errores, es decir, lo que queremos que ocurra cuando hagamos next en nuestras rutas
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = app;

