import joi from 'joi';

const addOrderSchema = joi.object({
  orderItems: joi.array()
    .items(
      joi.object({
        food: joi.string().required().messages({
          "any.required": "Food item is required",
        }),
        quantity: joi.number().integer().min(1).required().messages({
          "any.required": "Quantity is required",
          "number.min": "Quantity must be at least 1",
        }),
        price: joi.number().min(0).required().messages({
          "any.required": "Price is required",
          "number.min": "Price must be a positive number",
        }),
      })
    )
    .min(1)
    .required()
    .messages({
      "array.min": "At least one order item is required",
    }),
  buyer: joi.string().required().messages({
    "any.required": "Buyer is required",
  }),
  status: joi.string()
    .valid("preparing", "prepared", "on the way", "delivered")
    .default("preparing")
    .messages({
      "any.only": "Status must be one of preparing, prepared, on the way, or delivered",
    }),
  code: joi.string().required().messages({
    "any.required": "Order code is required",
  }),
  totalPrice: joi.number().min(0).default(0).messages({
    "number.min": "Total price must be a positive number",
  }),
  isDelivered: joi.boolean().default(false),
  deliveredAt: joi.date().optional().when("isDelivered", {
    is: true,
    then: joi.date().required().messages({
      "any.required": "Delivery date is required when order is delivered",
    }),
  }),
  paymentType: joi.string()
    .valid("card", "cash")
    .default("cash")
    .messages({
      "any.only": "Payment type must be either card or cash",
    }),
  address: joi.object({
    city: joi.string().required().messages({
      "any.required": "City is required for delivery address",
    }),
    street: joi.string().required().messages({
      "any.required": "Street is required for delivery address",
    }),
  }).required(),
  phone: joi.string()
    .pattern(/^\+?\d{10,15}$/)
    .required()
    .messages({
      "any.required": "Phone number is required",
      "string.pattern.base": "Phone number must be valid",
    }),
});

export default addOrderSchema;
