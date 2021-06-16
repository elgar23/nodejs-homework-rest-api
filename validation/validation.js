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

module.exports.validateContact = (req, res, next) => {
  return validate(schemaContact, req.body, next)
}
