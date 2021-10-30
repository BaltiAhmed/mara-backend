const express = require('express');
const route = express.Router();

const notificationControllers = require('../controllers/notification')

const {check} = require('express-validator')


route.get('/',notificationControllers.getNotifications)

module.exports = route