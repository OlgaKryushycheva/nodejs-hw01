const { program } = require("commander");

const contactsOperations = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await contactsOperations.listContacts();
      return console.table(list);

    case "get":
      const contact = await contactsOperations.getContactById(id);
      if (!contact) {
        throw new Error(`Contact with id=${id} not found!`);
      }
      return console.log(contact);

    case "add":
      const addedContact = await contactsOperations.addContact(
        name,
        email,
        phone
      );
      return console.log(addedContact);

    case "update":
      const updatedContact = await contactsOperations.updateContact(
        id,
        name,
        email,
        phone
      );

      if (!updatedContact) {
        throw new Error(`Contact with id=${id} not found!`);
      }

      return console.log(updatedContact);

    case "remove":
      const removedContact = await contactsOperations.removeContact(id);
      return console.log(removedContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();

invokeAction(options);
