const app = require('./config/express')();
const port = app.get('port');
const devices_routes = require('./api/routes/devices.js');
const categories_routes = require('./api/routes/categories.js');

app.use('/api/device', devices_routes);
app.use('/api/category', categories_routes);

// RODANDO NOSSA APLICAÇÃO NA PORTA SETADA
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});