const Contact = require('../schemas/contacts')

const listContacts = async () => {
  try {
    const result = await Contact.find({})
    return result
  } catch (error) {
    console.log(error)
  }
}

const getContactById = async (contactId) => {
  try {
    const result = await Contact.findById(contactId)
    return result
  } catch (error) {
    console.log(error)
  }
}

const addContact = async (body) => {
  try {
    const record = { ...body, ...(body.favorite ? {} : { favorite: false }) }
    const result = await Contact.create(record)
    return result
  } catch (error) {
    console.log(error)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const result = await Contact.findByIdAndUpdate(
      contactId,
      { ...body },
      { new: true }
    )
    return result
  } catch (error) {
    console.log(error)
  }
}

const removeContact = async (contactId) => {
  try {
    const result = await Contact.findByIdAndRemove(contactId)
    return result
  } catch (error) {
    console.log(error)
  }
}

const updateStatusContact = async (contactId, body) => {
  try {
    const result = await Contact.findByIdAndUpdate(
      contactId,
      { ...body },
      { new: true }
    )
    return result
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
