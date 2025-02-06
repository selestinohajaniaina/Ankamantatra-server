const express = require('express');
const  { Ankamantatra, sequelize, User, Reaction, Enregistrement, Response }  = require('../models');
const jwt = require('jsonwebtoken');
const Environement = require('../env');
const authentication = require('../middleware');
const secretKey = new Environement().SECRET_KEY;

const router = express.Router();

function addLike(entry, uid ) {
    return entry.map( (e) => {
        _hasLike = false;
        e.Reactions.map( (en) => {
            if( en.ankamantatraId == e.id && en.userId == uid ) _hasLike = true;
        } );
        e.hasLike = _hasLike;
        return e;
    })
}

router.post('/', authentication, async (req, res, next) => {
    const token = req.headers['authorization'];
    const { id } = jwt.verify(token, secretKey);
    const { content, response, category } = req.body;
    const _ankamantatra = await Ankamantatra.create({content: content, response: response, userId: id, categoryId: category});
    res.status(201).json({ status: true, message: 'Tontosa ny fametrahana ankamantatrao', data: _ankamantatra });
});

router.get('/', authentication, async (req, res, next) => {
    const token = req.headers['authorization'];
    const { id } = jwt.verify(token, secretKey);
    let _ankamantatras = await Ankamantatra.findAll({
        order: sequelize.literal('RAND()'),
        limit: 10,
        include: [User, Reaction, Enregistrement, Response]
    });
    const newAnkamantatra = addLike(_ankamantatras, id);
    res.status(201).json({ status: true, message: 'Tontosa ny fakana ankamantatra', data: newAnkamantatra, uid: id });
});

module.exports = router;