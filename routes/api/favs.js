const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Contact = mongoose.model("Contact");

// Оновити статус улюбленого контакту за ID
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      { new: true } // Параметр { new: true } поверне оновлену версію контакту
    );

    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
