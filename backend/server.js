const app = require('./config/express')();
const port = app.get('port');
const devices_routes = require('./api/routes/devices.js')

// RODANDO NOSSA APLICAÇÃO NA PORTA SETADA
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});

app.use('/api/device', devices_routes);