import joi from 'joi';

const addCategorySchema = joi.object({
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
    .allow('')
    .messages({
      'string.base': 'Description must be a string',
      'string.max': 'Description cannot exceed 250 characters',
    }),

  isActive: joi.boolean()
    .default(true)
    .messages({
      'boolean.base': 'isActive must be a boolean value',
    }),

    imageUrl: joi.object({
    fieldname: joi.string().required(),
    originalname: joi.string().required(),
    encoding: joi.string().required(),
    mimetype: joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
    size: joi.number().max(5242880).required(),  // حجم الملف يجب ألا يتجاوز 5 ميجابايت
    destination: joi.string().required(),
    filename: joi.string().required(),
    path: joi.string().required(),
  }).required().messages({
    'object.base': 'Image must be an object with valid properties',
  }),
});

export default addCategorySchema;
