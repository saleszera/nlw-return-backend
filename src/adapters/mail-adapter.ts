import { Attachment } from 'nodemailer/lib/mailer';

export interface SendMailData {
  subject: string;
  body: string;
  attachments?: Attachment[];
}

export interface MailAdapter {
  sendMail: (data: SendMailData) => void;
}
