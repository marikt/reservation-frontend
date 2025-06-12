import {StripeIntegrationServiceConfig} from './stripe-integration-service-config';

export class StripeIntegrationBusinessConfig {
  public hiddenKeyPrivate: string;
  public keyPublic: string;
  public stripeServices: StripeIntegrationServiceConfig[] = [];
}

