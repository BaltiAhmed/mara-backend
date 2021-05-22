const express = require('express');
const route = express.Router();

const avisControllers = require('../controllers/avis')

const {check} = require('express-validator')

route.post('/ajout', 
check('score')
.not()
.isEmpty(),
check('description')
.not()
.isEmpty()
, avisControllers.ajout)


route.patch('/:id', 
check('score')
.not()
.isEmpty(),
check('description')
.not()
.isEmpty()
, avisControllers.updateAvis)

route.get('/',avisControllers.getAvis)

route.delete('/:id',avisControllers.deleteAvis)

module.exports = route