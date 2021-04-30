import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'mymo.web.test@gmail.com', // generated ethereal user
    pass: 'test123456.', // generated ethereal password
  },
  requireTLS: true,
});

export default transporter;
