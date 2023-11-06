const express = require("express");
const router = express.Router();
const User = require("../../models/user");

// Ендпоінт для верифікації email
router.get("/:verificationToken", async (req, res) => {
  const { verificationToken } = req.params;

  try {
    // Знайти користувача за verificationToken
    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Оновити поля для підтвердження
    user.verificationToken = null;
    user.verify = true;
    await user.save();

    res.status(200).json({ message: 'Verification successful' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
