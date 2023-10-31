const express = require("express");
// const gravatar = require("gravatar");
const router = express.Router();
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const Joi = require("joi"); // Потрібно встановити Joi

const User = require("../../models/user");

// Схема валідації для реєстрації
const registrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Валідація даних
    const { error } = registrationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Генерування URL аватара на основі email
    // const avatarURL = gravatar.url(email, { s: "200", d: "identicon", r: "pg" });

    // Перевірка, чи пошта вже використовується
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    // Засолювання паролю і створення користувача
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = new User({ email, password: hashedPassword });

    await user.save();

    res.status(201).json({ user: { email: user.email, subscription: user.subscription, avatarURL: user.avatarURL } });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
