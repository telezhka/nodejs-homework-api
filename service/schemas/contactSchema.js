// const Joi = require('joi');

// const contactSchema = Joi.object({
//   name: Joi.string().min(3).max(30).required(),
//   email: Joi.string().email().required(),
//   phone: Joi.string().required(),
// });

// module.exports = contactSchema;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contact = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  }
);

const Contact = mongoose.model("Contact", contact);

module.exports = Contact;
