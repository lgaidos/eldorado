const express    = require('express');
const bodyParser = require('body-parser');
const config     = require('config');
const consign    = require('consign');
const cors       = require('cors');

module.exports = () => {
  const app = express();

  const options = {
    origin: true,
    credentials: true,
    maxAge: 3600
  };
  
  app.use(cors(options));

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.PORT || config.get('server.port'));

  // MIDDLEWARES
  app.use(bodyParser.json());

  return app;

};