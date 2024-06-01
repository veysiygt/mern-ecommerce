const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    avatar: Joi.object({
      fieldname: Joi.string().required(),
      originalname: Joi.string().required(),
      encoding: Joi.string().required(),
      mimetype: Joi.string().valid("image/jpeg", "image/png").required(),
      buffer: Joi.binary().required(),
      size: Joi.number().max(5000000).required(),
    }).required(),
  });

  return schema.validate(data);
};

module.exports = registerValidation;
