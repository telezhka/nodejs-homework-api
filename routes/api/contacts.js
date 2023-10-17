const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,

} = require("../../models/contacts");
const { createContact, updateContactt } = require('../../controllers/contactsController');

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
    const contact = await getContactById(id);
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
router.post('/', createContact);

// Видалити контакт за ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const removedContact = await removeContact(id);
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
router.put('/:id', updateContactt);

module.exports = router;
