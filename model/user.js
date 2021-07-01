const Users = require('../schemas/users')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET_KEY

const getUsersById = async (contactId) => {
  try {
    const result = await Users.findById(contactId)
    return result
  } catch (error) {
    console.log(error)
  }
}

const getUsersByEmail = async (email) => {
  try {
    const result = await Users.findOne({ email })
    return result
  } catch (error) {
    console.log(error)
  }
}

const addUsers = async (body) => {
  try {
    const user = new Users(body)
    return user.save()
  } catch (error) {
    console.log(error)
  }
}

const updateToken = async (id, token) => {
  await Users.findByIdAndUpdate(id, { token })
}

const login = async (email, password) => {
  const user = await Users.findOne({ email })

  const validPasswordUser = await user.validPassword(password)
  if (!user || !validPasswordUser) {
    return null
  }
  const id = user.id
  const payload = { id }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '7h' })
  await Users.findByIdAndUpdate(id, { token })
  return token
}

const logout = async (id) => {
  const data = await updateToken(id, null)
  return data
}

const getUsersByToken = async (token) => {
  const data = await Users.findOne({}, { token })
  return data
}

module.exports = {
  getUsersById,
  addUsers,
  getUsersByEmail,
  updateToken,
  login,
  logout,
  getUsersByToken,
}
