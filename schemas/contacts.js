const mongoose = require('mongoose')
const { Schema } = mongoose

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      minLength: 2,
      maxLength: 30,
    },
    email: {
      type: String,
      unique: true,
      minLength: 5,
      maxLength: 50,
    },
    phone: {
      type: String,
      required: [true, 'Set phone for contact'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
)
const Contact = mongoose.model('contact', contactSchema)

module.exports = Contact
