const Contact = require('../schemas/contacts')

const listContacts = async (userId, { limit = 20, page = 1, favorite }) => {
  try {
    const result = await Contact.paginate(
      { owner: userId },
      {
        limit,
        page,
        populate: { path: 'owner', select: 'subscription email ' },
      }
    )
    if (favorite) {
      const findFavorite = await Contact.find({ favorite }).populate({
        path: 'owner',
        select: 'subscription email ',
      })
      return { docs: findFavorite }
    }
    return result
  } catch (error) {
    console.log(error)
  }
}

const getContactById = async (userId, contactId) => {
  try {
    const result = await Contact.findOne({
      _id: contactId,
      owner: userId,
    }).populate({
      path: 'owner',
      select: 'subscription email ',
    })
    return result
  } catch (error) {
    console.log(error)
  }
}

const addContact = async (userId, body) => {
  try {
    const record = {
      ...body,
      ...(body.favorite ? {} : { favorite: false }),
      owner: userId,
    }
    const result = await Contact.create(record)
    return result
  } catch (error) {
    console.log(error)
  }
}

const updateContact = async (userId, contactId, body) => {
  try {
    const result = await Contact.findByIdAndUpdate(
      { _id: contactId, owner: userId },
      { ...body },
      { new: true }
    )
    return result
  } catch (error) {
    console.log(error)
  }
}

const removeContact = async (userId, contactId) => {
  try {
    const result = await Contact.findByIdAndRemove({
      _id: contactId,
      owner: userId,
    })
    return result
  } catch (error) {
    console.log(error)
  }
}

const updateStatusContact = async (_userId, contactId, body) => {
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
