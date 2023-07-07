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

// ==============================================
// invokeAction({ action: "list" });

// invokeAction({ action: "get", id: "05olLMgyVQdWRwgKfg5J6" });

// invokeAction({
//   action: "add",
//   name: "Mango",
//   email: "mango@gmail.com",
//   phone: "322-22-22",
// });

// invokeAction({
//   action: "update",
//   id: "mbp_OS45vZcARAcL7VDvs",
//   name: "Kiwi",
//   email: "mango@gmail.com",
//   phone: "322-22-22",
// });

// invokeAction({ action: "remove", id: "mbp_OS45vZcARAcL7VDvs" });

// =========================================================
// алгоритм:
/*
1. файл - контактс.js 
подключить fs = require("fs/promice")
все функции обработчки операцый
- асинхронніе
- fs.list...
- fs.write...
- fs/append...

path = require("path")

contactPath = path.join(__dirname, "db", "contacts.json");

это путь к файлу json - єто ужно чтобы записывать изменения в єтот файл
fs.list...(contactPath, ()=>{} /JSON.parse или stringify)

читать:
 ()=>{
 буфер = fs.readFile(contactsPath);
contacts - JSON.parse(buffer);
  return contacts;
}

читать 1
 (id)=>{
    получить все 
     Contact = вызов list()

     найти через файндИнд
     Contact1 = Contact.файнд
})


добавить
(data все кроме id)=>{
     получить все 
     Contact = вызов list()

newContact = {
    id = nanoid()
    data
}

запушить новфй контакт contacts.push(newContact);
записать все в json 
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
})

обновить
(все-все даные) {
    получить все 
     Contact = вызов list()
     
     найти по id файндИндекс
if (index === -1) {
    return null;
  }

  обновить
  Contacts[i] = {
  все данные новые и старые
  }

  записать все в json fs.write...
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

удалить 
(id)=>{
    получить все 
     Contact = вызов list()

найти по id файндИндекс
if (index === -1) {
    return null;
  }
    через слайс удалить по id
    [ ремувContact] = Contact.слайс(і, 1)
    записать все в json fs.write...
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
})


index.js

1 фукция, которая читает єкшені через свитч: 
єкшен - візов соответсвующей функции
ретерн консоль лог
все асинхронно

візов функций - 
параметі - деструктуризвано єкшен обязательно, остальное если есть

настроить коммандер
візов функции(параметр - 1 из командора)
в консоли - нод индекс екшн необходимые_параметри
*/
