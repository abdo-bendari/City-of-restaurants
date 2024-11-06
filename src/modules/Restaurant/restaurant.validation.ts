import joi from 'joi';

// إعداد الفاليديشن
const addRestaurantSchema = joi.object({
  title: joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Title cannot be empty',
      'any.required': 'Title is required',
      'string.min': 'Title must be at least 2 characters',
      'string.max': 'Title must be less than 50 characters',
    }),
  pickup: joi.boolean().default(true),
  delivery: joi.boolean().default(true),
  isOpen: joi.boolean().default(true),
  foods: joi.array().items(joi.string()).default([]),
  address: joi.array().items(joi.string()).default([]),
  imagesUrl: joi.array().items(joi.object({
    fieldname: joi.string().required(),
    originalname: joi.string().required(),
    encoding: joi.string().required(),
    mimetype: joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
    size: joi.number().max(5242880).required(),
    destination: joi.string().required(),
    filename: joi.string().required(),
    path: joi.string().required(),
  })).default([]),
  logoUrl: joi.object({
    fieldname: joi.string().required(),
    originalname: joi.string().required(),
    encoding: joi.string().required(),
    mimetype: joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
    size: joi.number().max(5242880).required(),
    destination: joi.string().required(),
    filename: joi.string().required(),
    path: joi.string().required(),
  }).optional(),
  rating: joi.number()
    .min(1)
    .max(5)
    .default(1),
  ratingCount: joi.string().optional(),
  code: joi.string().optional(),
  coords: joi.object({
    id: joi.string().optional(),
    latitude: joi.number().optional(),
    latitudeDelta: joi.number().optional(),
    longitude: joi.number().optional(),
    longitudeDelta: joi.number().optional(),
    address: joi.string().optional(),
    title: joi.string().optional(),
  }).optional(),
});

// تصدير الفاليديشن
export default addRestaurantSchema;
