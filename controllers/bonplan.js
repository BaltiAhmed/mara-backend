const httpError = require("../models/error");

const bonplan = require("../models/bonplan");
const site = require("../models/site");

const { validationResult } = require("express-validator");

const ajout = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const { titre, description, Ddebut, Dfin, type, IdUser } = req.body;

  const createdBonplan = new bonplan({
    titre,
    description,
    Ddebut,
    Dfin,
    type,
    photo: "dfd",
  });

  let existingUser;

  try {
    existingUser = await site.findById(IdUser);
  } catch {
    const error = new httpError("failed !", 500);
    return next(error);
  }

  try {
    await createdBonplan.save();
    existingUser.bonPlans.push(createdEvenement);
    await existingUser.save();
  } catch (err) {
    const error = new httpError("failed signup", 500);
    return next(error);
  }

  res.status(201).json({ bonPlan: createdBonplan });
};

const updateBonPlan = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const { titre, description, Ddebut, Dfin, type } = req.body;
  const id = req.params.id;

  let existingBonPlan;

  try {
    existingBonPlan = await bonplan.findById(id);
  } catch {
    return next(new httpError("failed !! ", 500));
  }

  existingBonPlan.titre = titre;
  existingBonPlan.description = description;
  existingBonPlan.Ddebut = Ddebut;
  existingBonPlan.Dfin = Dfin;
  existingBonPlan.type = type;
  existingBonPlan.photo = "edf";

  try {
    existingBonPlan.save();
  } catch {
    return next(new httpError("failed to save !! ", 500));
  }

  res.status(200).json({ bonPlan: existingBonPlan });
};

const getBonPlan = async (req, res, next) => {
  let existingBonPlan;

  try {
    existingBonPlan = await bonplan.find();
  } catch {
    const error = new httpError("failed !", 500);
    return next(error);
  }

  res.json({ bonPlan: existingBonPlan });
};

const getBonPlanById = async (req, res, next) => {
  const id = req.params.id;
  let existingBonPlan;

  try {
    existingBonPlan = await bonplan.findById(id);
  } catch {
    const error = new httpError("failed !", 500);
    return next(error);
  }

  res.json({ bonPlan: existingBonPlan });
};

const deleteBonPlan = async (req, res, next) => {
  const id = req.params.id;

  let existingBonPlan;

  try {
    existingBonPlan = await bonplan.findById(id);
  } catch {
    return next(new httpError("failed !! ", 500));
  }

  if (!existingBonPlan) {
    return next(new httpError("user does not exist !!", 422));
  }

  try {
    existingBonPlan.remove();
  } catch {
    return next(new httpError("failed !!!", 500));
  }

  res.status(200).json({ message: "deleted" });
};

exports.ajout = ajout;
exports.updateBonPlan = updateBonPlan;
exports.getBonPlan = getBonPlan;
exports.getBonPlanById = getBonPlanById;
exports.deleteBonPlan = deleteBonPlan;
