const express = require('express')
const router = express.Router()
const {
  validateContact,
  validateFavorite,
} = require('../../validation/validation')
const guard = require('../../helpers/guard')
const {
  patchList,
  putList,
  deleteList,
  postList,
  getIdList,
  getAllList,
} = require('../../controllers/contacts')

router.get('/', guard, getAllList)

router.get('/:contactId', guard, getIdList)

router.post('/', guard, validateContact, postList)

router.delete('/:contactId', guard, deleteList)

router.put('/:contactId', guard, validateContact, putList)

router.patch('/:contactId', guard, validateFavorite, patchList)

module.exports = router
