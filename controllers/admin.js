const httpError = require("../models/error");

const admin = require("../models/admin");

const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  /* const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }
 */
  const { name, email, password } = req.body;
  let existinguser;
  try {
    existinguser = await admin.findOne({ email: email });
  } catch (err) {
    const error = new httpError("problems!!!", 500);
    return next(error);
  }

  if (existinguser) {
    const error = new httpError("user exist", 422);
    return next(error);
  }

  const createduser = new admin({
    name,
    email,
    password,
  });

  try {
    await createduser.save();
  } catch (err) {
    const error = new httpError("failed signup", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createduser.id, email: createduser.email },
      "secret-thinks",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new httpError("failed signup try again later", 500);
    return next(error);
  }

  res
    .status(201)
    .json({ admin: createduser.id, email: createduser.email, token: token });
};

const login = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed", 422));
  }
  const { email, password } = req.body;
  let existinguser;
  try {
    existinguser = await admin.findOne({ email: email });
  } catch {
    return next(new httpError("failed!!", 500));
  }
  if (!existinguser || existinguser.password !== password) {
    return next(new httpError("invalid input passed", 422));
  }
  let token;
  try {
    token = jwt.sign(
      { userId: existinguser.id, email: existinguser.email },
      "secret-thinks",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new httpError("failed signup try again later", 500);
    return next(error);
  }
  res.status(200).json({ admin: existinguser, token: token });
};

const getAdmin = async (req, res, next) => {
  let existingAdmin;

  try {
    existingAdmin = await admin.find();
  } catch {
    const error = new httpError("failed !", 500);
    return next(error);
  }

  res.json({ admin: existingAdmin });
};

exports.signup = signup;
exports.login = login;
exports.getAdmin = getAdmin;
