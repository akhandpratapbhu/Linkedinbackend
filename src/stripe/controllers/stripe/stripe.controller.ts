import { Controller, Post, Body } from '@nestjs/common';
import { StripeService } from 'src/stripe/service/stripe/stripe.service';

@Controller('stripe')
export class StripeController {

    constructor(private stripeService: StripeService) {}

  @Post('create-payment-intent')
  async createPaymentIntent(@Body('amount') amount: number) {
    const paymentIntent = await this.stripeService.createPaymentIntent(amount);
    return {
      clientSecret: paymentIntent.client_secret,
    };
  }
}
