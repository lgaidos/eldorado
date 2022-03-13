const express = require('express');
const router = express.Router();

const  { 
    getDevices,
    insertDevice,
    deleteDevice 
} = require('../controllers/devices.js');

router.get('/buscar', getDevices);

router.post('/salvar', insertDevice);

router.delete('/excluir/:deviceId', deleteDevice);

module.exports = router;