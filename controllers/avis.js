const httpError = require("../models/error");

const avis = require("../models/avis");
const site = require("../models/site");

const { validationResult } = require("express-validator");

const ajout = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const { score, description, IdUser } = req.body;

  const createdAvis = new avis({
    score,
    description,
  });

  let existingUser;

  try {
    existingUser = await site.findById(IdUser);
  } catch {
    const error = new httpError("failed !", 500);
    return next(error);
  }

  try {
    await createdAvis.save();
    existingUser.avis.push(createdAvis);
    await existingUser.save();
  } catch (err) {
    const error = new httpError("failed signup", 500);
    return next(error);
  }

  res.status(201).json({ avis: createdAvis });
};

const updateAvis = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const { score, description, IdUser } = req.body;
  const id = req.params.id;

  let existingAvis;

  try {
    existingAvis = await avis.findById(id);
  } catch {
    return next(new httpError("failed !! ", 500));
  }

  existingAvis.tiscoretre = score;
  existingAvis.description = description;

  try {
    existingAvis.save();
  } catch {
    return next(new httpError("failed to save !! ", 500));
  }

  res.status(200).json({ avis: existingAvis });
};

const getAvis = async (req, res, next) => {
  let existingAvis;

  try {
    existingAvis = await avis.find();
  } catch {
    const error = new httpError("failed !", 500);
    return next(error);
  }

  res.json({ avis: existingAvis });
};

const deleteAvis = async (req, res, next) => {
  const id = req.params.id;

  let existingAvis;

  try {
    existingAvis = await avis.findById(id);
  } catch {
    return next(new httpError("failed !! ", 500));
  }

  if (!existingAvis) {
    return next(new httpError("avis does not exist !!", 422));
  }

  try {
    existingAvis.remove();
  } catch {
    return next(new httpError("failed !!!", 500));
  }

  res.status(200).json({ message: "deleted" });
};



exports.ajout=ajout
exports.updateAvis=updateAvis
exports.getAvis=getAvis
exports.deleteAvis=deleteAvis
