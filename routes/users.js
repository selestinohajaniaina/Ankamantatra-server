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

router.get('/profil', authentication, async (req, res, next) => {
    const token = req.headers['authorization'];
    const { id } = jwt.verify(token, secretKey);
    const users = await User.findByPk(id);
    const { email, password } = users;
    let type = email && password ? 'pro' : 'simple';
    res.status(200).json({ status: true, message: 'ireo mombamomba anao', data: users, type: type});
})

router.post('/profil', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        where: {email: email}
    });
    let message = 'tontosa ny fidirana...';
    if(user) {
        if(password != passwordUnhased) message = 'Diso ny teny miafina...';
        else {
            const { passwordUnhased } = jwt.verify(user.password, secretKey);
            const token = jwt.sign({id: user.id, type: 'pro'}, secretKey);
            res.status(201).json({ status: true, message: message, data: user, token: token});
        }
    } else {
        message = 'Tsy hita ao anaty mambra...';
        res.status(201).json({ status: false, message: message, data: null, token: null});
    }
});

module.exports = router;