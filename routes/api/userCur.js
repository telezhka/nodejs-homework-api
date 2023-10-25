const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/auth"); // Підключення мідлвара для аутентифікації

module.exports = (User) => {
  // Ендпоінт для отримання даних поточного користувача
  router.get("/", authMiddleware, async (req, res) => {
    try {
      // Отримайте дані поточного користувача з req.user
      const currentUser = req.user;

      if (!currentUser) {
        return res.status(401).json({ message: "Not authorized" });
      }

      // Поверніть дані поточного користувача
      const { email, subscription } = currentUser;
      res.status(200).json({ email, subscription });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  return router;
};
