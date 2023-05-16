const { validationResult } = require("express-validator");

const { errorResponse } = require("../helpers/apiResponse");

exports.validateError = (req, res, next) => {
  const { errors } = validationResult(req);

  if (errors && errors.length > 0)
    return errorResponse({
      res,
      error: errors,
      msg: errors[0].msg,
      status: 400,
    });

  return next();
};
