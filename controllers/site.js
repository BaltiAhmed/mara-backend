const httpError = require("../models/error");

const site = require("../models/site");

const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
 /*  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  } */

  const {
    nom,
    email,
    password,
    description,
    adresse,
    gouvernorat,
    long,
    lat,
    tel,
    categorie,
    capacite,
  } = req.body;
 
  let existingSite;
  try {
    existingSite = await site.findOne({ email: email });
  } catch (err) {
    const error = new httpError("problems!!!", 500);
    return next(error);
  }

  if (existingSite) {
    const error = new httpError("site exist", 422);
    return next(error);
  }

  

  const createdSite = new site({
    nom,
    email,
    password,
    description,
    adresse,
    gouvernorat,
    long,
    lat,
    tel,
    photo: req.file.path,
    categorie,
    capacite,
    scoreT: 0,
    evenements: [],
    bonPlan: [],
    avis: [],
  });

  try {
    createdSite.save();
  } catch (err) {
    const error = new httpError("failed signup", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { siteId: createdSite.id, email: createdSite.email },
      "secret-thinks",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new httpError("failed signup try again later", 500);
    return next(error);
  }

  res
    .status(201)
    .json({ siteId: createdSite.id, email: createdSite.email, token: token });
};

const login = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const { email, password } = req.body;

  let existingSite;

  try {
    existingSite = await site.findOne({ email: email });
  } catch {
    return next(new httpError("failed !!", 500));
  }

  if (!existingSite || existingSite.password !== password) {
    return next(new httpError("invalid input passed ", 422));
  }

  let token;
  try {
    token = jwt.sign(
      { siteId: existingSite.id, email: existingSite.email },
      "secret-thinks",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new httpError("failed signup try again later", 500);
    return next(error);
  }

  res.status(200).json({ site: existingSite, token: token });
};

const getSite = async (req, res, next) => {
  let existingSite;

  try {
    existingSite = await site.find({}, "-password");
  } catch {
    const error = new httpError("failed !", 500);
    return next(error);
  }

  res.json({ sites: existingSite });
};

const getSiteById = async (req, res, next) => {
  const id = req.params.id;

  let existingSite;

  try {
    existingSite = await site.findById(id);
  } catch {
    const error = new httpError("failed !", 500);
    return next(error);
  }

  res.json({ site: existingSite });
};

const updateSite = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const {
    nom,
    email,
    password,
    description,
    adresse,
    gouvernorat,
    long,
    lat,
    tel,
    categorie,
    capacite,
  } = req.body;
  const id = req.params.id;

  let existingSite;

  try {
    existingSite = await site.findById(id);
  } catch {
    return next(new httpError("failed !! ", 500));
  }

  existingSite.nom = nom;
  existingSite.email = email;
  existingSite.password = password;
  existingSite.description = description;
  existingSite.adresse = adresse;
  existingSite.gouvernorat = gouvernorat;
  existingSite.long = long;
  existingSite.lat = lat;
  existingSite.tel = tel;
  existingSite.categorie = categorie;
  existingSite.capacite = capacite;

  try {
    existingSite.save();
  } catch {
    return next(new httpError("failed to save !! ", 500));
  }

  res.status(200).json({ site: existingSite });
};

const deleteSite = async (req, res, next) => {
  const id = req.params.id;

  let existingSite;

  try {
    existingSite = await site.findById(id);
  } catch {
    return next(new httpError("failed !! ", 500));
  }

  if (!existingSite) {
    return next(new httpError("user does not exist !!", 422));
  }

  try {
    existingSite.remove();
  } catch {
    return next(new httpError("failed !!!", 500));
  }

  res.status(200).json({ message: "deleted" });
};

exports.signup = signup;
exports.login = login;
exports.getSite = getSite;
exports.getSiteById = getSiteById;
exports.updateSite = updateSite;
exports.deleteSite = deleteSite;
