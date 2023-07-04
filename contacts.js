const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const buffer = await fs.readFile(contactsPath);
  const contacts = JSON.parse(buffer);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactsById = contacts.find((contact) => contact.id === contactId);
  return contactsById || null;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
}

async function updateContact(id, name, email, phone) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }

  contacts[index] = {
    id,
    name,
    email,
    phone,
  };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}

async function removeContact(contactId) {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  const [removedContact] = contacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return removedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
