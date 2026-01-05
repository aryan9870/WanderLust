const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  title: Joi.string().required(),

  description: Joi.string().required(),

  price: Joi.number().min(0).required(),

  location: Joi.string().required(),

  country: Joi.string().required(),

  category: Joi.string().required(),
});


module.exports.reviewSchema = Joi.object({
  rating: Joi.number().required().min(1).max(5),
  comment: Joi.string().required(),
});

