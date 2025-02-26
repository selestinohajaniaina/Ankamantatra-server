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

router.put('/profil', authentication, async (req, res, next) => {
    const token = req.headers['authorization'];
    const { id } = jwt.verify(token, secretKey);
    const { name, email, password } = req.body;
    const user = await User.update({
        name: name,
        email: email,
        password: jwt.sign( password, secretKey)
    }, { where: {id: id} });
    res.status(200).json({ status: true, message: 'voaova ireo mombamomba anao', data: user, type: 'pro'});
})

router.post('/profil', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        where: {email: email}
    });
    if(user) {
        const passwordUnhased = jwt.verify(user.password, secretKey);
        if(password != passwordUnhased) {
            res.status(201).json({ status: false, message: 'Diso ny teny miafina...', data: null, token: null});
        } else {
            const token = jwt.sign({id: user.id, type: 'pro'}, secretKey);
            res.status(201).json({ status: true, message: 'tontosa ny fidirana...', data: user, token: token});
        }
    } else {
        res.status(201).json({ status: false, message: 'Tsy hita ao anaty mambra...', data: null, token: null});
    }
});

module.exports = router;