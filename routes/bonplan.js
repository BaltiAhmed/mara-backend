const express = require('express');
const route = express.Router();

const bonPlanControllers = require('../controllers/bonplan')

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
, bonPlanControllers.ajout)


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
, bonPlanControllers.updateBonPlan)

route.get('/',bonPlanControllers.getBonPlan)
route.get('/:id',bonPlanControllers.getBonPlanById)
route.delete('/:id',bonPlanControllers.deleteBonPlan)

module.exports = route