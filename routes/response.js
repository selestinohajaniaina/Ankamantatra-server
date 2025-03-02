const express = require('express');
const  { Response, Notification }  = require('../models');
const jwt = require('jsonwebtoken');
const Environement = require('../env');
const authentication = require('../middleware');
const secretKey = new Environement().SECRET_KEY;

const router = express.Router();

router.post('/', authentication, async (req, res, next) => {
    const token = req.headers['authorization'];
    const { id } = jwt.verify(token, secretKey);
    console.log('\n\nvaliny ', req.body);
    
    const { ankamantatra, valinteny } = req.body;
    const response = await Response.create({content: valinteny, userId: id, ankamantatraId: ankamantatra});
    const notification = await Notification.create({userId: id, ankamantatraId: ankamantatra, type: 'answer', message: '', isRead: false});
    const responseLenght = await Response.count({
        where: { ankamantatraId: ankamantatra }
    });
    res.status(201).json({ status: true, message: 'Tontosa ny fitahirizana valiteny', data: responseLenght });
});


module.exports = router;