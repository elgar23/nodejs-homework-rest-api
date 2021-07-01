const Joi = require('joi')

const schemaContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  phone: Joi.string().min(6).max(20).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  favorite: Joi.boolean(),
})

const schemaFavorite = Joi.object({
  favorite: Joi.boolean().required(),
})

const schemaUser = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  password: Joi.string().min(6).max(20).required(),
})

const validate = (schema, body, next) => {
  const { error } = schema.validate(body)
  if (error) {
    const [{ message }] = error.details
    return next({
      message: {
        status: 'Internal Server Error',
        code: 500,
        message: `Filed: ${message.replace(/"/g, '')} `,
      },
    })
  }
  next()
}
const validateFav = (schema, body, next) => {
  const { error } = schema.validate(body)
  if (error) {
    return next({
      message: {
        status: 'Bad Request',
        code: 400,
        message: 'Missing field favorite',
      },
    })
  }
  next()
}

const validateContact = (req, res, next) => {
  return validate(schemaContact, req.body, next)
}
const validateFavorite = (req, res, next) => {
  return validateFav(schemaFavorite, req.body, next)
}
const validateUser = (req, res, next) => {
  return validate(schemaUser, req.body, next)
}

module.exports = { validateContact, validateFavorite, validateUser }
