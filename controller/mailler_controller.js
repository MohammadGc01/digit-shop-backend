const nodemailer = require("nodemailer");
const logger = require("../services/logger");
require("dotenv").config();

async function send_email(to, subject, text) {
  const transporter = nodemailer.createTransport({
    service: process.env.MaillerService,
    auth: {
      user: process.env.MaillerUser,
      pass: process.env.MaillerPass,
    },
  });

  const mailOption = {
    from: process.env.MaillerUser,
    to: `${to}`,
    subject: `${subject}`,
    text: `${text}`,
  };

  transporter.sendMail(mailOption , async (err , info) => {
    if(err){
      const log = new logger('error', `موقغ ارسال ایمیل با این جزییات  : ${to} , ${subject} , ${text} مشکلی پیش اومد  : ${err.message}`)
      await log.save()
      console.log(err.message);      
      return;
    }
    
    const log = new logger(
      'info',
      `ایمیل با موفقیت ارسال شد به: ${to} موضوع: ${subject}`
    );
    await log.save();

  })
}

module.exports = {
  send_email,
};
