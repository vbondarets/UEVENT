const nodemailer = require('nodemailer');

const PassworResetMailingService = (email, token) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "1816e3680f5752",
          pass: "8ca1959b8e7c8e"
        },
        secure: false,
        requireTLS: true
    });
    const message = {
        from: "no-reply@ucode-uevent.com",
        to: email,
        subject: "Subject",
        html: `<h1>Your link for password resetting<a href="http://localhost:5000/api/auth/password-reset/${token}">click here</a></h1>`
    }
    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log("tut")
          console.log(err)
        } else {
            console.log("tut2")
          console.log(info);
        }
    })
}

module.exports = PassworResetMailingService;