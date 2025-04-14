import nodemailer from 'nodemailer';

import { EMAIL_PASSWORD, MAIL_ID } from './serverConfig.js';

export default nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: MAIL_ID,
    pass: EMAIL_PASSWORD
  }
});
