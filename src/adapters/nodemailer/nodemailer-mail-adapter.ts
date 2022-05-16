import nodemailer from 'nodemailer';

import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ body, subject, attachments }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Raniery Sales <raniery@email.com>',
      subject,
      html: body,
      attachments,
    });
  }
}
