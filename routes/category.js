const express = require('express');
const  { Category }  = require('../models');
const jwt = require('jsonwebtoken');
const Environement = require('../env');
const authentication = require('../middleware');

const router = express.Router();
const secretKey = new Environement().SECRET_KEY;

router.get('/', authentication, async (req, res, next) => {
    const users = await Category.findAll();
    res.status(200).json({ status: true, message: 'ireo sokajy rehetra', data: users});
})

module.exports = router;