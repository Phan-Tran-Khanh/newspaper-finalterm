import { Injectable } from '@nestjs/common';
import { PaymentService } from './payment.interface';

@Injectable()
export class ZaloPayPaymentService implements PaymentService {
  pay(): string {
    return 'pay';
  }

  callback(): string {
    return 'callback';
  }
}
