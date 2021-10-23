const express = require("express");
const route = express.Router();

const categorieControllers = require("../controllers/categorie");

const { check } = require("express-validator");

route.post("/ajout", check("nom").not().isEmpty(), categorieControllers.ajout);

route.get("/", categorieControllers.getCategorie);

route.delete('/:id',categorieControllers.deletCategorie)

module.exports = route;
