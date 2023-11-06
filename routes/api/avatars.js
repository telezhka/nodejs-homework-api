const express = require("express");
const router = express.Router();
const multer = require("multer");
const jimp = require("jimp");
const path = require("path");
const fs = require("fs");

const upload = multer({ dest: "tmp" }); // Папка для завантаження файлів

// const authMiddleware = require("../../middleware/auth");
const User = require("../../models/user");

// Ендпоінт для оновлення аватарки
router.patch("/", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    // Перевірка токену та ідентифікація користувача
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Завантаження файла
    upload.single("avatar")(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ message: "File upload failed" });
      }

      // Отримання ідентифікатора користувача, щоб створити унікальне ім'я файла
      const userId = user._id;

      // Обробка та зміна розміру аватарки
      const avatarPath = req.file.path;
      const image = await jimp.read(avatarPath);
      await image.cover(250, 250).write(avatarPath);

      // Зміна ім'я файлу на основі ідентифікатора користувача
      const newFileName = `${userId}${path.extname(req.file.filename)}`;
      const newFilePath = path.join("public/avatars", newFileName);

      // Перенесення обробленої аватарки в папку public/avatars
      fs.rename(avatarPath, newFilePath, (error) => {
        if (error) {
          return res.status(500).json({ message: "Internal Server Error" });
        }

        // Оновлення поля avatarURL користувача зі згенерованим URL аватара
        const avatarURL = `/avatars/${newFileName}`;
        user.avatarURL = avatarURL;

        // Збереження оновленого користувача в базі даних
        user.save();

        res.status(200).json({ avatarURL });
      });
    });
  } catch (error) {
    return res.status(401).json({ message: "Not authorized" });
  }
});

module.exports = router;
