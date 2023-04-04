const nodemailer = require('nodemailer');

const fileMailingService = async(email, filePath) => {
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "1816e3680f5752",
        pass: "8ca1959b8e7c8e"
      }
    });
    const message = {
        from: "no-reply@ucode-uevent.com",
        to: email,
        subject: "Subject",
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