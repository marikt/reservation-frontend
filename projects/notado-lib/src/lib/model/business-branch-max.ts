import {BusinessBranch} from './business-branch';
import {OpeningDay} from './opening-day';

export class BusinessBranchMax extends BusinessBranch {

  public services: number[];
  public serviceGroups: number[];
  public openingDays: OpeningDay[];

}
