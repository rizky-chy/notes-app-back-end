const validateQuery = (schema) => (req, res, next) => { const { error, value } = schema.validate(req.query, {
  abortEarly: false,
  allowUnknown: false,
  stripUnknow: true
});
if (error) return next(error);
req.validated = value;
next();
};

export default validateQuery;