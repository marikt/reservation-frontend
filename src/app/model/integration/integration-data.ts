import {IntegrationType} from '../../../../projects/notado-lib/src/lib/util/integration-type';

export class IntegrationData {

  public type: IntegrationType;
  public businessId: number;
  public connected: boolean;
  public valid: boolean;
  public config: any;
  public name: string;
  public label: string;
  public desc: string;
  public url: string;
  public color: string;
  public classTextSuccess: string;
  public classTextDanger: string;

}
