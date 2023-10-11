const Joi = require('joi');
const contactSchema = require('../schemas/contactSchema');
const contacts = require('../models/contacts.json');
const { addContact, updateContact } = require('../models/contacts');


// Контролер для створення нового контакта
const createContact = async (req, res) => {
  try {
    const { name, email, phone } = req.query;

    const { error } = contactSchema.validate({ name, email, phone });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newContact = await addContact(name, email, phone);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Контролер для оновлення існуючого контакта
const updateContactt = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.query;

    const { error } = contactSchema.validate({ name, email, phone });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedContact = await updateContact(id, { name, email, phone });
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createContact,
  updateContactt,
};
