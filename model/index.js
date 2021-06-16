const fs = require('fs/promises')
// const contacts = require('./contacts.json')

const path = require('path')

const contactsPath = path.resolve(__dirname, 'contacts.json')

const listContacts = async () => {
  const listContacts = await fs.readFile(`${contactsPath}`, 'utf8')
  const list = await JSON.parse(listContacts)
  return list
}

const getContactById = async (contactId) => {
  const listContacts = await fs.readFile(`${contactsPath}`, 'utf8')
  const list = await JSON.parse(listContacts)
  const contactList = await list.filter((data) => `${data.id}` === contactId)
  return contactList
}

const addContact = async (body) => {
  const { name, email, phone } = body
  const addListContacts = await fs.readFile(`${contactsPath}`, 'utf8')
  const contact = await JSON.parse(addListContacts)
  const contactId = contact.length + 1
  const jsonContact = {
    id: contactId,
    name: `${name}`,
    email: `${email}`,
    phone: `${phone}`,
  }
  const allJson = [...contact, jsonContact]
  fs.writeFile(`${contactsPath}`, `${JSON.stringify(allJson, null, 4)}`)
  return jsonContact
}

const removeContact = async (contactId) => {
  const contents = await fs.readFile(`${contactsPath}`, 'utf8')
  const contactJson = await JSON.parse(contents)
  const contact = await contactJson.filter((data) => `${data.id}` !== contactId)
  fs.writeFile(`${contactsPath}`, `${JSON.stringify(contact, null, 4)}`)
  const idContact = await contactJson.filter(
    (data) => `${data.id}` === contactId
  )
  if (idContact.length !== 0) {
    return true
  } else {
    return false
  }
}

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body
  const addListContacts = await fs.readFile(`${contactsPath}`, 'utf8')
  const contactJson = await JSON.parse(addListContacts)
  const contact = await contactJson.filter((data) => `${data.id}` !== contactId)
  const jsonContact = {
    id: contactId,
    name: `${name}`,
    email: `${email}`,
    phone: `${phone}`,
  }
  const allJson = [...contact, jsonContact]
  fs.writeFile(`${contactsPath}`, `${JSON.stringify(allJson, null, 4)}`)
  return jsonContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
