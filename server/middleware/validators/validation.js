const ApiError = require("../../helpers/error/ApiError");

const validation = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(ApiError.conflict('Validation error: ' + error.details[0].message));
    }
    next();
  };
  
module.exports = validation;