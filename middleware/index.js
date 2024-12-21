const jwt = require('jsonwebtoken');
const Environement = require('../env');
const { User } = require('../models');
const secretKey = new Environement().SECRET_KEY;

module.exports = Authentification = async (req, res, next) => {
    try {
        const token = await req.headers['authorization'];
        const { id } = jwt.verify(await token, secretKey);
        const user = await User.findByPk(id);
        if (!user ) throw new Error();
        next();
        req.body.uid = id;
    } catch (error) {
        res.status(401).send({status: false, message: 'Unautorised', data: []})
    }
}