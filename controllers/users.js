const list = require('../model/user')
require('dotenv').config()
const jimp = require('jimp')
const fs = require('fs/promises')
const path = require('path')

const signup = async (req, res, next) => {
  const { email } = await req.body
  const user = await list.getUsersByEmail(email)
  if (user) {
    return next(
      res
        .status(409)
        .json({ status: 'conflict', code: 409, message: 'Email in use' })
    )
  }
  try {
    const newUser = await list.addUsers(req.body)
    return res.status(201).json({
      status: 'success',
      code: 201,
      user: {
        email: newUser.email,
        subscription: 'starter',
        avatar: newUser.avatar,
      },
    })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  const { email, password } = await req.body

  try {
    const token = await list.login(email, password)
    if (token) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        token,
        user: { email, subscription: 'started' },
      })
    }
    next(res.status(401).json({ message: 'Email or password is wrong' }))
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, next) => {
  try {
    const id = req.user.id
    const user = await list.getUsersById(id)
    if (!user) {
      return res.status(401).json({ message: 'Not authorized' })
    }
    await list.logout(id)
    return res.status(204).json({
      message: 'No Content',
    })
  } catch (error) {
    next(error)
  }
}

const current = async (req, res, next) => {
  try {
    const token = req.user.token
    const user = await list.getUsersByToken(token)
    if (!user) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    return res.status(200).json({
      status: 'success',
      email: req.user.email,
      subscription: 'starter',
      avatar: req.user.avatar,
    })
  } catch (error) {
    next(error)
  }
}

const updateAvatar = async (req, res, next) => {
  const { id } = req.user
  const avatarUrl = await saveAvatarUser(req)
  await list.updateAvatar(id, avatarUrl)
  return res
    .status(200)
    .json({ status: 'success', code: 200, data: { avatar: avatarUrl } })
}

const saveAvatarUser = async (req) => {
  const FOLDER_AVATARS = process.env.FOLDER_AVATARS
  const pathFile = req.file.path
  const newNameAvatar = `${Date.now().toString()}-${req.file.originalname}`
  const img = await jimp.read(pathFile)
  await img
    .autocrop()
    .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER, jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(pathFile)
  try {
    await fs.rename(
      pathFile,
      path.join(process.cwd(), 'public', FOLDER_AVATARS, newNameAvatar)
    )
  } catch (error) {
    console.log(error.message)
  }
  const oldAvatar = req.user.avatar
  if (oldAvatar.includes(`${FOLDER_AVATARS}/`)) {
    await fs.unlink(path.join(process.cwd(), 'public', oldAvatar))
  }
  return path.join(FOLDER_AVATARS, newNameAvatar).replace('\\', '/')
}
module.exports = {
  signup,
  login,
  logout,
  current,
  updateAvatar,
  saveAvatarUser,
}
