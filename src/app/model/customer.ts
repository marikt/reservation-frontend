import {KeyValue} from '../../../projects/notado-lib/src/lib/util/key-value';

export class Customer {
  public id: string;
  public name: string;
  public email: string;
  public phone: string;
  public fullPathImg: string;
  public lastVisit: string;
  public visitCount: number;
  public visitedServiceCount: KeyValue[];
}
