import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

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

  sendMail(mailOptions: any): Promise<any> {
    if (mailOptions.from === undefined) {
      mailOptions.from = process.env.EMAIL_FROM;
    }
    console.log(mailOptions);
    return this.transporter.sendMail(mailOptions);
  }
}
