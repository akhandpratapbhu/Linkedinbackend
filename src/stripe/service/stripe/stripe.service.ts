import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const Stripe = require('stripe');

@Injectable()
export class StripeService {

    private stripe;

    constructor(private configService: ConfigService) {
      this.stripe = Stripe(this.configService.get<string>('sk_test_51PVq7g00cRf59ySirtpirFKds9Xmq22uPLTSz5LkV104NY6U8nEMP7tfFbFVDqEhFwpSvuD235TGllWYTEwJDQra00AYjqBtZP'));
    }
  
    async createPaymentIntent(amount: number) {
      return this.stripe.paymentIntents.create({
        amount,
        currency: 'usd',
      });
    }
}
