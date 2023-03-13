const validation = (schema, data) => {
    const { error } = schema.validate(data);
    if (error) {
      return ({
        message:error.details[0].message,
        field: error.details[0].path[0]
      });
    }
    else{
      return "OK";
    }
  };
  
module.exports = validation;