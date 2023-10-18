const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const task = new Schema(
//   {
//     title: {
//       type: String,
//       minlength: 2,
//       maxlength: 70,
//     },
//     text: {
//       type: String,
//       minlength: 3,
//       maxlength: 170,
//     },
//     isDone: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { versionKey: false, timestamps: true }
// );

// const Task = mongoose.model("task", task);

// module.exports = Task;
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
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
});

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
