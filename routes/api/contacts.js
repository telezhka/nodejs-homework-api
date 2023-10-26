// const express = require("express");
// const router = express.Router();
// const ctrlTask = require("../../controller");

// router.get("/contacts", ctrlTask.get);

// router.get("/contacts/:id", ctrlTask.getById);

// router.post("/contacts", ctrlTask.create);

// router.put("/contacts/:id", ctrlTask.update);

// router.patch("/contacts/:id/status", ctrlTask.updateStatus);

// router.delete("/contacts/:id", ctrlTask.remove);

// module.exports = router;
const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/auth");

module.exports = (Contact) => {
  // Отримати всі контакти
  router.get("/", authMiddleware, async (req, res) => {
    // Захист рауту за допомогою аутентифікації
    try {
      const contactsData = await Contact.find();
      res.status(200).json(contactsData);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // Отримати контакт за ID
  router.get("/:id", authMiddleware, async (req, res) => {
    // Захист рауту за допомогою аутентифікації
    const { id } = req.params;

    try {
      const contact = await Contact.findById(id);
      if (contact) {
        res.status(200).json(contact);
      } else {
        res.status(404).json({ message: "Not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // Додати новий контакт
  router.post("/", async (req, res) => {
    const { name, email, phone } = req.query;

    try {
      const newContact = new Contact({ name, email, phone });
      const savedContact = await newContact.save();
      res.status(201).json(savedContact);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // Видалити контакт за ID
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const removedContact = await Contact.findByIdAndRemove(id);
      if (removedContact) {
        res.status(200).json({ message: "Contact deleted" });
      } else {
        res.status(404).json({ message: "Not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // Оновити контакт за ID
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    try {
      const updatedContact = await Contact.findByIdAndUpdate(id, {
        name,
        email,
        phone,
      });
      if (updatedContact) {
        res.status(200).json(updatedContact);
      } else {
        res.status(404).json({ message: "Not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  return router;
};
