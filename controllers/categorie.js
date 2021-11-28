const httpError = require("../models/error");

const categorie = require("../models/categorie");

const { validationResult } = require("express-validator");

const ajout = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const { nom } = req.body;

  const createdCategorie = new categorie({
    nom,
  });

  try {
    await createdCategorie.save();
  } catch (err) {
    const error = new httpError("failed signup", 500);
    return next(error);
  }

  res.status(201).json({ categorie: createdCategorie });
};

const getCategorie = async (req, res, next) => {
  let existingCategorie;

  try {
    existingCategorie = await categorie.find();
  } catch {
    const error = new httpError("failed !", 500);
    return next(error);
  }

  res.json({ categorie: existingCategorie });
};

const deletCategorie = async (req, res, next) => {
  const id = req.params.id;

  let existingCategorie;

  try {
    existingCategorie = await categorie.findById(id);
  } catch {
    return next(new httpError("failed !! ", 500));
  }

  if (!existingCategorie) {
    return next(new httpError("categorie does not exist !!", 422));
  }

  try {
    existingCategorie.remove();
  } catch {
    return next(new httpError("failed !!!", 500));
  }

  res.status(200).json({ message: "deleted" });
};

const updateCategorie = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const { nom } = req.body;
  const id = req.params.id;

  let existingCategorie;

  try {
    existingCategorie = await categorie.findById(id);
  } catch {
    return next(new httpError("failed !! ", 500));
  }

  existingCategorie.nom = nom;
  

  try {
    existingCategorie.save();
  } catch {
    return next(new httpError("failed to save !! ", 500));
  }

  res.status(200).json({ existingCategorie: existingCategorie });
};

exports.ajout = ajout;
exports.getCategorie = getCategorie;
exports.deletCategorie = deletCategorie;
exports.updateCategorie = updateCategorie
