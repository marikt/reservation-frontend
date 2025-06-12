import {MarketingContactState} from '../../util/marketing-contact-state';

export class MarketingContactSearchCriteria {

  public urls: string[];
  /**
   * we dont know if the contact has reservation system or not, must be manually decided
   */
  public state: MarketingContactState;

}
