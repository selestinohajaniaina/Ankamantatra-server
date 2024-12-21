const express = require('express');
const  { Ankamantatra }  = require('../models');
const jwt = require('jsonwebtoken');
const Environement = require('../env');
const authentication = require('../middleware');
const secretKey = new Environement().SECRET_KEY;

const router = express.Router();

router.post('/', authentication, async (req, res, next) => {
    const token = req.headers['authorization'];
    const { id } = jwt.verify(token, secretKey);
    const { content, category } = req.body;
    const _ankamantatra = await Ankamantatra.create({content: content, userId: id, categoryId: category});
    res.status(201).json({ status: true, message: 'Tontosa ny fametrahana ankamantatrao', data: _ankamantatra });
});

module.exports = router;