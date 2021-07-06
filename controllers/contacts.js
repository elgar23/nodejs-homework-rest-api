const list = require('../model/index')

const getAllList = async (req, res, next) => {
  try {
    const userId = req.user.id
    const {
      docs: contacts,
      totalDocs: total,
      page,
      limit,
    } = await list.listContacts(userId, req.query)
    res.status(200).json({
      status: 'success',
      code: 200,
      data: { contacts, limit, page, total },
    })
  } catch (error) {
    next(error)
  }
}

const getIdList = async (req, res, next) => {
  try {
    const userId = req.user.id
    const { contactId } = await req.params
    const getContactId = await list.getContactById(userId, contactId)
    if (getContactId.length !== 0) {
      res.status(200).json({
        status: 'success',
        code: 200,
        data: getContactId,
      })
    } else {
      res.status(404).json({
        status: 'Error',
        code: 404,
        message: 'Not found',
      })
    }
  } catch (error) {
    next(error)
  }
}

const postList = async (req, res, next) => {
  try {
    const userId = req.user.id
    const listAdd = await list.addContact(userId, req.body)
    if (!listAdd) {
      return res.status(400).json({ message: 'missing required name field' })
    }
    res.status(201).json({
      status: 'success',
      code: 201,
      data: listAdd,
    })
  } catch (error) {
    next(error)
  }
}

const deleteList = async (req, res, next) => {
  try {
    const userId = req.user.id
    const { contactId } = await req.params
    const deleteContacts = await list.removeContact(userId, contactId)
    if (deleteContacts) {
      res.status(200).json({
        status: 'success',
        code: 200,
        message: 'contact deleted',
      })
    } else {
      res.status(404).json({
        status: 'Error',
        code: 404,
        message: 'Not found',
      })
    }
  } catch (error) {
    next(error)
  }
}

const putList = async (req, res, next) => {
  try {
    const userId = req.user.id
    const { contactId } = await req.params
    const putContacts = await list.updateContact(userId, contactId, req.body)
    if (!putContacts) {
      return res.status(404).json({ code: 404, message: 'Not found' })
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      data: putContacts,
    })
  } catch (error) {
    next(error)
  }
}

const patchList = async (req, res, next) => {
  try {
    const { contactId } = await req.params
    const patchContacts = await list.updateStatusContact(contactId, req.body)
    if (!patchContacts) {
      return res.status(404).json({ code: 404, message: 'Not found' })
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      data: patchContacts,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  patchList,
  putList,
  deleteList,
  postList,
  getIdList,
  getAllList,
}
