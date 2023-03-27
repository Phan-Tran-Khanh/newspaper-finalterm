import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  transporter: nodemailer.Transporter;
  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport(
      this.configService.get('email'),
    );
  }

  sendMail(mailOptions: any): Promise<any> {
    if (mailOptions.from === undefined) {
      mailOptions.from = this.configService.get('email.from');
    }
    return this.transporter.sendMail(mailOptions);
  }
}
