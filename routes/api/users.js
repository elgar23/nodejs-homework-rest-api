const express = require('express')
const router = express.Router()
const guard = require('../../helpers/guard')
const { validateUser } = require('../../validation/validation')
const uploadAvatar = require('../../helpers/upload-avatar')
const {
  signup,
  login,
  logout,
  current,
  updateAvatar,
  verificationToken,
  verification,
} = require('../../controllers/users')

router.post('/signup', validateUser, signup)

router.post('/login', validateUser, login)

router.post('/logout', guard, logout)

router.get('/current', guard, current)

router.patch('/avatars', guard, uploadAvatar.single('avatar'), updateAvatar)

router.get('/verify/:verificationToken', verificationToken)

router.post('/verify', verification)

module.exports = router
