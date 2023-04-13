const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path')

const notificationMailingService = async (template, email) => {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "09a71704903760",
      pass: "51b8e5c4ea9fc4"
    }
  });
  ejs.renderFile(path.resolve(__dirname, './'), template, (err, html) => {
    if (err){
      console.log(err)
    }
    const message = {
      from: "no-reply@ucode-uevent.com",
      to: email,
      subject: "Notification",
      html: html,
    }
    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log("tut oshibka")
        console.log(err)
      } else {
        console.log("tut srabotalo")
        // console.log(info);
      }
    })
  })
}

module.exports = notificationMailingService;