const nodemailer = require('nodemailer');

const fileMailingService = async (email, filePath) => {
  const transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    // port: 587,
    // auth: {
    //   user: 'arlene53@ethereal.email',
    //   pass: 'erue3XByvF5Zhr3aN8'
    // }
    // host: "sandbox.smtp.mailtrap.io",
    // port: 2525,
    // auth: {
    //   user: "09a71704903760",
    //   pass: "51b8e5c4ea9fc4"
    // }
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    username: "api",
    Password:f6b3993366ee0da88c46343005f95014,
    Auth: "PLAIN, LOGIN",
    STARTTLS: "Required"
  });
  const message = {
    from: "no-reply@ucode-uevent.com",
    to: email,
    subject: "Ticket",
    html: `<h1>Your ticket</h1>`,
    attachments: [{
      filename: "ticket.pdf",
      path: filePath,
    }]
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
}

module.exports = fileMailingService;