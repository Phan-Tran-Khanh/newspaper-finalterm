import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/smtp-transport';

@Injectable()
export class EmailService {
  transporter: nodemailer.Transporter;
  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport(
      this.configService.get('email'),
    );
    this.transporter.verify((error, success) => {
      if (success) {
        Logger.log('Connect to Mail Server successfully!', 'EmailService');
      } else {
        Logger.error(error, 'EmailService');
      }
    });
  }

  forgotPasswordTemplate(email: string, token: string): MailOptions {
    const url = `http://localhost:3000/reset-password?token=${token}`;
    return {
      to: email,
      subject: 'Reset your password',
      text: `Click the link to reset your password: ${url}`,
      html: `<p>Click the link to reset your password: <a href="${url}">${url}</a></p>`,
    };
  }

  sendMail(mailOptions: MailOptions): Promise<any> {
    if (mailOptions.from === undefined) {
      mailOptions.from = process.env.EMAIL_FROM;
    }
    return this.transporter.sendMail(mailOptions);
  }
}
