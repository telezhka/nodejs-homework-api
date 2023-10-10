const express = require("express");
const router = express.Router();
const contacts = require("../../models/contacts.json");

// Отримати всі контакти
router.get("/", async (req, res) => {
  try {
    const contactsData = await listContacts();
    res.status(200).json(contactsData);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Отримати контакт за ID
router.get("/:id", async (req, res) => {
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

// Додати новий контакт
router.post("/", async (req, res) => {
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

// Видалити контакт за ID
router.delete("/:id", async (req, res) => {
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

// Оновити контакт за ID
router.put("/:id", async (req, res) => {
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

module.exports = router;
