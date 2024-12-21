const express = require('express');
const  { Message, User }  = require('../models');
const jwt = require('jsonwebtoken');
const Environement = require('../env');
const authentication = require('../middleware');
const secretKey = new Environement().SECRET_KEY;

const router = express.Router();

router.post('/', authentication, async (req, res, next) => {
    const token = req.headers['authorization'];
    const { id } = jwt.verify(token, secretKey);
    const { message } = req.body;
    const _message = await Message.create({content: message, userId: id});
    res.status(201).json({ status: true, message: 'Voaray ny hafatra', data: [] });
});

router.get('/:id', authentication, async (req, res, next) => {
    const { id } = req.params;
    const _message = await Message.findOne({
        where: { id: id },
        include: [User]
    })
    console.log(_message);
    res.status(201).json({ status: true, message: 'message id 1 iny ', data: _message });
})

module.exports = router;