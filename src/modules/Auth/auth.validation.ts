import joi from "joi";

 const addUserSchema = joi.object({
  name: joi.string().min(2).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name should have a minimum length of 2 characters",
    "string.max": "Name should have a maximum length of 50 characters",
  }),

  email: joi.string().email().required(),
  password: joi.string()
  .length(8)
  .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/) 
  .required(),
  role: joi.string()
     .valid("client", "admin", "vendor", "driver")
    .default("client"),

  phone: joi.array()
    .items(joi.string().pattern(/^[0-9]+$/)).default([]),

  address: joi.array().items(joi.string()).default([]),

  profilePic: joi.string().uri().default("https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg")
});

export default addUserSchema;