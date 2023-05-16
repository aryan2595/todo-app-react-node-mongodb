const { USER_FOUND_SUCCESSFULLY } = require("../lang/en/user");
const { successResponse, errorResponse } = require("../helpers/apiResponse");

exports.getUserProfile = async (req, res) => {
  try {
    return successResponse({
      res,
      msg: USER_FOUND_SUCCESSFULLY,
      status: 200,
      data: req.user,
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};
