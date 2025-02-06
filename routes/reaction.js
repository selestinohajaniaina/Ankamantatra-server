const express = require('express');
const  { Reaction }  = require('../models');
const jwt = require('jsonwebtoken');
const Environement = require('../env');
const authentication = require('../middleware');
const secretKey = new Environement().SECRET_KEY;

const router = express.Router();

router.post('/', authentication, async (req, res, next) => {
    const token = req.headers['authorization'];
    const { id } = jwt.verify(token, secretKey);
    const { ankamantatra } = req.body;

    const entry = await Reaction.findOne({ 
        where: { userId: id, ankamantatraId: ankamantatra }
    });

    if (entry) {
        await entry.destroy();
    } else {
        const reaction = await Reaction.create({like: 1, userId: id, ankamantatraId: ankamantatra});
    }
    
    const reactionLenght = await Reaction.count({
        where: { ankamantatraId: ankamantatra }
    });

    res.status(201).json({ status: true, message: 'Tontosa ny fanovana reaction', data: { countReaction: reactionLenght } });
});


module.exports = router;