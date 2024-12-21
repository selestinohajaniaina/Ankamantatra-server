const express = require('express');
const  { User }  = require('../models');
const jwt = require('jsonwebtoken');
const Environement = require('../env');
const authentication = require('../middleware');

const router = express.Router();
const secretKey = new Environement().SECRET_KEY;

router.post('/', async (req, res) => {
    const { name } = req.body;
    const user = await User.create({name: name});
    const token = jwt.sign({id: user.id, type: 'simple'}, secretKey);
    res.status(201).json({ status: true, message: 'Kaonty voaforona', data: user, token: token});
});

router.get('/', authentication, async (req, res, next) => {
    const users = await User.findAll();
    res.status(200).json({ status: true, message: 'ireo mpikambana rehetra', data: users});
})

module.exports = router;