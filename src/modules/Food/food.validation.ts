import joi from 'joi';

const addFoodSchema = joi.object({
  title: joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.base': 'Title must be a string',
      'string.empty': 'Title cannot be empty',
      'string.min': 'Title must be at least 2 characters',
      'string.max': 'Title must not exceed 50 characters',
      'any.required': 'Title is required',
    }),

  description: joi.string()
    .max(250)
    .required()
    .messages({
      'string.base': 'Description must be a string',
      'string.max': 'Description cannot exceed 250 characters',
      'any.required': 'Description is required',
    }),

  foodTags: joi.string().allow(''),

  isAvailable: joi.boolean()
    .default(true)
    .messages({
      'boolean.base': 'isAvailable must be a boolean value',
    }),

  code: joi.string().allow(''),

  category: joi.string().hex().length(24).allow(null),

  restaurant: joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      'string.base': 'Restaurant ID must be a string',
      'string.hex': 'Restaurant ID must be a valid hexadecimal',
      'string.length': 'Restaurant ID must be 24 characters long',
      'any.required': 'Restaurant ID is required',
    }),

  rating: joi.number()
    .min(1)
    .max(5)
    .default(1)
    .messages({
      'number.base': 'Rating must be a number',
      'number.min': 'Rating cannot be less than 1',
      'number.max': 'Rating cannot exceed 5',
    }),

  price: joi.number()
    .min(0)
    .required()
    .messages({
      'number.base': 'Price must be a number',
      'number.min': 'Price must be a positive number',
      'any.required': 'Price is required',
    }),

  imagesUrl: joi.array()
    .items(
      joi.object({
        fieldname: joi.string().required(),
        originalname: joi.string().required(),
        encoding: joi.string().required(),
        mimetype: joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
        size: joi.number().max(5242880).required(), // حجم الملف يجب ألا يتجاوز 5 ميجابايت
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
      })
    )
    .required()
    .messages({
      'array.base': 'Images must be an array of files',
      'any.required': 'At least one image is required',
    }),
});

export default addFoodSchema;
