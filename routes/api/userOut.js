const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/auth"); // Підключення мідлвара для аутентифікації

module.exports = (User) => {
  // Ендпоінт для розлогінення користувача
  router.post("/", authMiddleware, async (req, res) => {
    try {
      const userId = req.user._id;

      // Знайдіть користувача за _id
      const user = await User.findById(userId);

      if (!user) {
        return res.status(401).json({ message: "Not authorized" });
      }

      // Очистіть токен користувача
      user.token = null;
      await user.save();

      res.status(204).send(); // Відповідь без вмісту (No Content) при успішному розлогіненні
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  return router;
};
