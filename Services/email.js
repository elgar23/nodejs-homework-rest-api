const sendgrid = require('@sendgrid/mail')
const Mailgen = require('mailgen')
require('dotenv').config()

class EmailService {
  #sender = sendgrid
  #GenerateTemplate = Mailgen
  constructor(env) {
    switch (env) {
      case 'development':
        this.link = 'http://localhost:3000'
        break
      case 'production':
        this.link = 'linc for production'
        break
      default:
        this.link = 'http://localhost:3000'
        break
    }
  }
  #createTemplateVerifyEmail(verifyToken) {
    const mailGenerator = new this.#GenerateTemplate({
      theme: 'neopolitan',
      product: {
    
        name: 'System contacts',
        link: this.link,
        
      },
    })
    const email = {
      body: {
        name: 'Guest',
        intro:
          "Welcome to System contacts! We're very excited to have you on board.",
        action: {
          instructions:
            'To get started with System contacts, please click here:',
          button: {
            color: '#22BC66', 
            text: 'Confirm your account',
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
      },
    }

    
    const emailBody = mailGenerator.generate(email)
    return emailBody
  }

  async sendVerifyEmail(verifyToken, email) {
    this.#sender.setApiKey(process.env.API_KEY_SENDGRID)
    const msg = {
      to: email,
      from: 'superel2303@gmail.com', 
      subject: 'Verify email',
      html: this.#createTemplateVerifyEmail(verifyToken),
    }
    this.#sender.send(msg)
  }
}
module.exports = EmailService