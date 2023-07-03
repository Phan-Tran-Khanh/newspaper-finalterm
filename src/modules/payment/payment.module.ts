import { Module } from '@nestjs/common';
import { ZaloPayPaymentService } from './zalopay.payment.service';
import { MomoPaymentService } from './momo.payment.service';

@Module({
  providers: [ZaloPayPaymentService, MomoPaymentService],
})
export class PaymentModule {}
