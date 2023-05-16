const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const { successResponse, errorResponse } = require("../helpers/apiResponse");
const { USER_NOT_FOUND, INCORRECT_PASSWORD_ERR } = require("../lang/en/user");

const {
  YOU_ARE_LOGGED_IN_SUCCESSFULLY,
  SOMETHING_WENT_WRONG,
} = require("../lang/en/common");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (user === null)
      return errorResponse({
        res,
        msg: USER_NOT_FOUND,
        status: 400,
        error: USER_NOT_FOUND,
      });

    const isPassMatched = await bcrypt.compare(password, user.password);

    if (!isPassMatched) {
      return errorResponse({
        res,
        msg: INCORRECT_PASSWORD_ERR,
        status: 400,
        error: INCORRECT_PASSWORD_ERR,
      });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });

    user.token = token;

    return successResponse({
      res,
      msg: YOU_ARE_LOGGED_IN_SUCCESSFULLY,
      data: user,
    });
  } catch (error) {
    return errorResponse({
      res,
      msg: SOMETHING_WENT_WRONG,
      status: 400,
      error,
    });
  }
};
