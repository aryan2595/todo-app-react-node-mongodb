const jwt = require("jsonwebtoken");

const User = require("../models/user");

const { errorResponse } = require("../helpers/apiResponse");

exports.auth = async (req, res, next) => {
  let token = req.headers.authorization || "";
  token = token ? token.replace("Bearer ", "") : "";

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({ email: data.email });

    if (user) {
      req.user = user;
      return next();
    }

    return errorResponse({ res, msg: "You are unauthorized!", status: 401 });
  } catch (error) {
    return errorResponse({ res, msg: "You are unauthorized!", status: 401 });
  }
};
