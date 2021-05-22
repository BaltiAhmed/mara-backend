const express = require('express');
const route = express.Router();

const evenementControllers = require('../controllers/evenement')

const {check} = require('express-validator')

route.post('/ajout', 
check('titre')
.not()
.isEmpty(),
check('description')
.not()
.isEmpty(),
check('Ddebut')
.not()
.isEmpty(),
check('Dfin')
.not()
.isEmpty(),
check('type')
.not()
.isEmpty()
, evenementControllers.ajout)


route.patch('/:id', 
check('titre')
.not()
.isEmpty(),
check('description')
.not()
.isEmpty(),
check('Ddebut')
.not()
.isEmpty(),
check('Dfin')
.not()
.isEmpty(),
check('type')
.not()
.isEmpty()
, evenementControllers.updateEvenement)

route.get('/',evenementControllers.getEvenement)
route.get('/:id',evenementControllers.getEvenementById)
route.delete('/:id',evenementControllers.deleteEvenement)

module.exports = route