const express = require('express');
const  { Ankamantatra, Notification, User }  = require('../models');
const { Op } = require('sequelize');
const { sequelize } = require('../models');
const jwt = require('jsonwebtoken');
const Environement = require('../env');
const authentication = require('../middleware');
const secretKey = new Environement().SECRET_KEY;

const router = express.Router();

router.get('/', authentication, async (req, res, next) => {
    const token = req.headers['authorization'];
    const { id } = jwt.verify(token, secretKey);
    let notifications = await Notification.findAll({
        order: [['createdAt', 'DESC']],
        where: {
            ankamantatraId: {
                [Op.in]: sequelize.literal(`(SELECT id FROM Ankamantatras WHERE userId = ${id})`)
            }
        },
        include: [Ankamantatra, User]
    });
    const readNotifications = await Notification.update({
            isRead: true,
        }, {
            where: {
                ankamantatraId: {
                    [Op.in]: sequelize.literal(`(SELECT id FROM Ankamantatras WHERE userId = ${id})`)
                }
            }
        });
    res.status(201).json({ status: true, message: 'Tontosa ny fakana notification', data: notifications });
});

router.get('/count', authentication, async (req, res, next) => {
    const token = req.headers['authorization'];
    const { id } = jwt.verify(token, secretKey);
    let notifications = await Notification.count({
        order: [['createdAt', 'DESC']],
        where: {
            ankamantatraId: {
                [Op.in]: sequelize.literal(`(SELECT id FROM Ankamantatras WHERE userId = ${id})`)
            },
            isRead: false
        },
        include: [Ankamantatra, User]
    });
    res.status(201).json({ status: true, message: 'Tontosa ny fakana notification', data: notifications });
});

module.exports = router;