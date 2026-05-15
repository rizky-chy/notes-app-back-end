const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true
  });

  console.log('Body yang masuk:', req.body); // Tambahkan ini
  console.log('Hasil Validasi:', value);    // Dan ini

  if (error) return next(error);
  req.validated = value;
  next();
};



export default validate;