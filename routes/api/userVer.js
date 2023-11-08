// const express = require("express");
// const router = express.Router();
// const User = require("../../models/user");

// // Ендпоінт для верифікації email
// router.get("/:verificationToken", async (req, res) => {
//   const { verificationToken } = req.params;

//   try {
//     // Знайти користувача за verificationToken
//     const user = await User.findOne({ verificationToken });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Оновити поля для підтвердження
//     user.verificationToken = null;
//     user.verify = true;
//     await user.save();

//     res.status(200).json({ message: 'Verification successful' });
//   } catch (error) {
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const User = require("../../models/user");

// Ендпоінт для повторної відправки email
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    // Валідація даних
    const { error } = Joi.object({
      email: Joi.string().email().required(),
    }).validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Пошук користувача за email
    const user = await User.findOne({ email });

    // Перевірка, чи верифіковано користувача
    if (user && user.verify) {
      return res.status(400).json({ message: "Verification has already been passed" });
    }

    // Відправка email на пошту користувача
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Verify your email address",
      text: `
        Hi ${user.name},

        Please click the following link to verify your email address:

        https://my-app.com/users/verify/${user.verificationToken}

        Thanks,
        The team telezhka
      `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Email sent: ${info.messageId}`);
      }
    });

    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
