const httpError = require("../models/error");

const transport = require("../models/transport");
const site = require("../models/site");

const { validationResult } = require("express-validator");

const ajout = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const { type, prix, depart, temps, idSite } = req.body;

  const createdTransport = new transport({
    type,
    prix,
    depart,
    temps,
  });

  let existingUser;

  try {
    existingUser = await site.findById(idSite);
  } catch {
    const error = new httpError("failed !", 500);
    return next(error);
  }
  

  try {
    createdTransport.save();
    existingUser.transports.push(createdTransport);
    existingUser.save();
  } catch (err) {
    const error = new httpError("failed signup", 500);
    return next(error);
  }

  res.status(201).json({ transport: createdTransport });
};

const updateTransport = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const { type, prix, depart, temps, idSite } = req.body;
  const id = req.params.id;

  let existingTransport;

  try {
    existingTransport = await transport.findById(id);
  } catch {
    return next(new httpError("failed !! ", 500));
  }

  existingTransport.type = type;
  existingTransport.prix = prix;
  existingTransport.depart = depart;
  existingTransport.temps = temps;

  try {
    existingTransport.save();
  } catch {
    return next(new httpError("failed to save !! ", 500));
  }

  res.status(200).json({ transport: existingTransport });
};

const delateTransport = async (req, res, next) => {
  const id = req.params.id;

  let existingTransport;

  try {
    existingTransport = await transport.findById(id);
  } catch {
    return next(new httpError("failed !! ", 500));
  }

  if (!existingTransport) {
    return next(new httpError("user does not exist !!", 422));
  }

  try {
    existingTransport.remove();
  } catch {
    return next(new httpError("failed !!!", 500));
  }

  res.status(200).json({ message: "deleted" });
};

const getTransportBySiteId = async (req, res, next) => {
  const id = req.params.id;

  let existingTransport;
  try {
    existingTransport = await site.findById(id).populate("transports");
  } catch (err) {
    const error = new httpError(
      "Fetching BolPlan failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingTransport || existingTransport.transports.length === 0) {
    return next(
      new httpError("Could not find BonPlan for the provided user id.", 404)
    );
  }

  res.json({
    transports: existingTransport.transports.map((el) =>
      el.toObject({ getters: true })
    ),
  });
};

exports.ajout =ajout
exports.updateTransport =updateTransport
exports.delateTransport =delateTransport
exports.getTransportBySiteId = getTransportBySiteId
