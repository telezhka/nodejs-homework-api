// const fs = require('fs/promises')

// const listContacts = async () => {}

// const getContactById = async (contactId) => {}

// const removeContact = async (contactId) => {}

// const addContact = async (body) => {}

// const updateContact = async (contactId, body) => {}

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json"); // Шлях до файлу з контактами
// const contactsPath = "./contacts.json";
const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contactsData = await listContacts();
    const contact = contactsData.find((c) => c.id === contactId);
    return contact || null;
  } catch (error) {
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contactsData = await listContacts();
    const index = contactsData.findIndex((c) => c.id === contactId);
    if (index === -1) return null;
    const removedContact = contactsData.splice(index, 1)[0];
    await fs.writeFile(contactsPath, JSON.stringify(contactsData, null, 2));
    return removedContact;
  } catch (error) {
    throw error;
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contactsData = await listContacts();
    const newContact = { id: Date.now().toString(), name, email, phone };
    contactsData.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contactsData, null, 2));
    return newContact;
  } catch (error) {
    throw error;
  }
};

const updateContact = async (contactId, { name, email, phone }) => {
  try {
    const contactsData = await listContacts();
    const index = contactsData.findIndex((c) => c.id === contactId);
    if (index === -1) return null;
    contactsData[index] = { id: contactId, name, email, phone };
    await fs.writeFile(contactsPath, JSON.stringify(contactsData, null, 2));
    return contactsData[index];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
