const express = require('express')

const router = express.Router()

const list = require('../../model/index')
const { validateContact } = require('../../validation/validation')

router.get('/', async (req, res, next) => {
  try {
    const readList = await list.listContacts()
    res.json({
      status: 'success',
      code: 200,
      data: readList,
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const getContactId = await list.getContactById(contactId)
    if (!getContactId) {
      res.json({
        status: 'success',
        code: 200,
        data: getContactId,
      })
    } else {
      res.json({
        status: '404',
        code: 404,
        message: 'Not found',
      })
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', validateContact, async (req, res, next) => {
  try {
    const listAdd = await list.addContact(req.body)
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
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = await req.params
    const deleteContacts = await list.removeContact(contactId)
    if (deleteContacts) {
      res.json({
        status: 'success',
        code: 200,
        message: 'contact deleted',
      })
    } else {
      res.json({
        status: '404',
        code: 404,
        message: 'Not found',
      })
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', validateContact, async (req, res, next) => {
  try {
    const { contactId } = await req.params
    const putContacts = await list.updateContact(contactId, req.body)
    if (!putContacts) {
      return res.status(404).json({ message: 'Not found' })
    }
    res.json({
      status: 'success',
      code: 200,
      data: putContacts,
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
