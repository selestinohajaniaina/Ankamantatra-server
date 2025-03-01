const express = require('express');
const  { sequelize, Enregistrement, Ankamantatra, User, Reaction, Response }  = require('../models');
const jwt = require('jsonwebtoken');
const Environement = require('../env');
const authentication = require('../middleware');
const secretKey = new Environement().SECRET_KEY;

const router = express.Router();

router.post('/', authentication, async (req, res, next) => {
    const token = req.headers['authorization'];
    const { id } = jwt.verify(token, secretKey);
    const { ankamantatra } = req.body;

    const entry = await Enregistrement.findOne({ 
        where: { userId: id, ankamantatraId: ankamantatra }
    });

    if (entry) {
        await entry.destroy();
    } else {
        const enregistrement = await Enregistrement.create({ankamantatraId: ankamantatra , userId: id});
    }

    const enregistrementLenght = await Enregistrement.count({
        where: { ankamantatraId: ankamantatra }
    });

    res.status(201).json({ status: true, message: 'Tontosa ny fitahirizana', data: enregistrementLenght });
});

router.get('/', authentication, async (req, res, next) => {
    const token = req.headers['authorization'];
    const { id } = jwt.verify(token, secretKey);
    let enregistrement = await Enregistrement.findAll({
        order: [['createdAt', 'DESC']],
        where: {userId: id},
        include: [{
            model: Ankamantatra,
            include: [Reaction, Response, User]
        }]
    });
    res.status(201).json({ status: true, message: 'Tontosa ny fakana ireo tahiry', data: enregistrement });
});

module.exports = router;