const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const ApiError = require('../../helpers/error/ApiError');

const notificationMailingService = async (template, email) => {
  console.log(template, "to", email)
  const transporter = nodemailer.createTransport({
    // host: "sandbox.smtp.mailtrap.io",
    // port: 2525,
    // username: "api",
    // Password:"4792259ac48032d3b23fd0491b98e921",
    // Auth: "PLAIN, LOGIN",
    // STARTTLS: "Required"
    ////////////////////
    // auth: {
    //   user: "09a71704903760",
    //   pass: "51b8e5c4ea9fc4"
    // }
    ////////////////////
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "09a71704903760",
      pass: "51b8e5c4ea9fc4"
    }
  });
  ejs.renderFile(path.resolve(__dirname, './template.ejs'), template, (err, html) => {
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