const express = require('express');
const router = express.Router();

const  { 
    getDevices,
    insertDevice,
    deleteDevice 
} = require('../controllers/controllers.js');

router.get('/get', getDevices);

router.post('/save', insertDevice);

router.delete('/delete/:deviceId', deleteDevice);

module.exports = router;