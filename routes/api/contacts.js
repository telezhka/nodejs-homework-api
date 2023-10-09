const express = require("express");

const router = express.Router();

// router.get("/", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// router.get("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// router.post("/", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// router.delete("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// router.put("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// module.exports = router;

// GET /api/contacts
router.get("/api/contacts", async (req, res) => {
  try {
    const contacts = await contacts.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET /api/contacts/:id
router.get("/api/contacts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await contacts.getContactById(id);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST /api/contacts
router.post("/api/contacts", async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newContact = await contacts.addContact(name, email, phone);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// DELETE /api/contacts/:id
router.delete("/api/contacts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const removedContact = await contacts.removeContact(id);
    if (removedContact) {
      res.status(200).json({ message: "Contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// PUT /api/contacts/:id
router.put("/api/contacts/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const updatedContact = await contacts.updateContact(id, {
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

// Запустити сервер на порту 3000 або іншому, якщо вам потрібно
const PORT = process.env.PORT || 3000;
router.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
