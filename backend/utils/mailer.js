const nodemailer = require('nodemailer')
// const config = require('../../config')
const dotenv = require('dotenv')

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_SEND,
        pass: process.env.MAIL_PASS
    }
})

module.exports = transporter
