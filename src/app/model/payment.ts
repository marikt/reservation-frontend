import {PaymentPlan} from '../util/payment-plan';

export class Payment {
  public token: string;
  public plan: PaymentPlan;
  public validity: string;
  public valid: boolean;
  public validityFormatted: string;

}
