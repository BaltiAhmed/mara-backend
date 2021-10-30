const httpError = require("../models/error");

const notification = require("../models/notification");

const { validationResult } = require("express-validator");

const ajout = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const { message, type, id } = req.body;

  const createdNotification = new notification({
    message,
    type,
    id,
  });

  try {
    await createdNotification.save();
  } catch (err) {
    const error = new httpError("failed", 500);
    return next(error);
  }

  res.status(201).json({ notification: createdNotification });
};

const getNotifications = async (req, res, next) => {
  let existingNotificaion;

  try {
    existingNotificaion = await notification.find();
  } catch {
    const error = new httpError("failed !", 500);
    return next(error);
  }

  res.json({ notifications: existingNotificaion });
};

exports.ajout = ajout
exports.getNotifications = getNotifications
