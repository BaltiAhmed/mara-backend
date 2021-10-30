const httpError = require("../models/error");

const evenement = require("../models/evenement");
const site = require("../models/site");
const notification = require("../models/notification");

const { validationResult } = require("express-validator");

const ajout = async (req, res, next) => {
  const { titre, description, Ddebut, Dfin, type, IdUser } = req.body;
  console.log(titre, description, Ddebut, Dfin, type, IdUser);

  const createdEvenement = new evenement({
    titre,
    description,
    Ddebut,
    Dfin,
    type,
    photo: req.file.path,
    finished: false,
    reservations: [],
  });

  let existingUser;

  try {
    existingUser = await site.findById(IdUser);
  } catch {
    const error = new httpError("failed !", 500);
    return next(error);
  }

  const createdNotification = new notification({
    message:"Le sie "+existingUser.nom+" a ajouté un noveaux évenement veuillez le consulter pour plus d'information",
    type:"Evenement",
    image:existingUser.photo,
    id:createdEvenement._id,
  });

  try {
    createdEvenement.save();
    existingUser.evenements.push(createdEvenement);
    existingUser.save();
    createdNotification.save()
  } catch (err) {
    const error = new httpError("failed signup", 500);
    return next(error);
  }

  res.status(201).json({ evenement: createdEvenement });
};

const updateEvenement = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const { titre, description, Ddebut, Dfin, type } = req.body;
  const id = req.params.id;

  let existingEvenement;

  try {
    existingEvenement = await evenement.findById(id);
  } catch {
    return next(new httpError("failed !! ", 500));
  }

  existingEvenement.titre = titre;
  existingEvenement.description = description;
  existingEvenement.Ddebut = Ddebut;
  existingEvenement.Dfin = Dfin;
  existingEvenement.type = type;
  existingEvenement.photo = req.file.path;

  try {
    existingEvenement.save();
  } catch {
    return next(new httpError("failed to save !! ", 500));
  }

  res.status(200).json({ evenement: existingEvenement });
};

const getEvenement = async (req, res, next) => {
  let existingEvenement;

  try {
    existingEvenement = await evenement.find();
  } catch {
    const error = new httpError("failed !", 500);
    return next(error);
  }

  res.json({ evenement: existingEvenement });
};

const getEvenementById = async (req, res, next) => {
  const id = req.params.id;
  let existingEvenement;

  try {
    existingEvenement = await evenement.findById(id);
  } catch {
    const error = new httpError("failed !", 500);
    return next(error);
  }

  res.json({ evenement: existingEvenement });
};

const deleteEvenement = async (req, res, next) => {
  const id = req.params.id;

  let existingEvenement;

  try {
    existingEvenement = await evenement.findById(id);
  } catch {
    return next(new httpError("failed !! ", 500));
  }

  if (!existingEvenement) {
    return next(new httpError("user does not exist !!", 422));
  }

  try {
    existingEvenement.remove();
  } catch {
    return next(new httpError("failed !!!", 500));
  }

  res.status(200).json({ message: "deleted" });
};

const getEvenementSiteId = async (req, res, next) => {
  const id = req.params.id;

  let existingEvenement;
  try {
    existingEvenement = await site.findById(id).populate("evenements");
  } catch (err) {
    const error = new httpError(
      "Fetching evenement failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingEvenement || existingEvenement.evenements.length === 0) {
    return next(
      new httpError("Could not find events for the provided user id.", 404)
    );
  }

  res.json({
    evenement: existingEvenement.evenements.map((el) =>
      el.toObject({ getters: true })
    ),
  });
};

exports.ajout = ajout;
exports.updateEvenement = updateEvenement;
exports.getEvenement = getEvenement;
exports.getEvenementById = getEvenementById;
exports.deleteEvenement = deleteEvenement;
exports.getEvenementSiteId = getEvenementSiteId;
