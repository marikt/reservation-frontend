import {PaymentHistoryStatus} from '../util/payment-history-status';

export class PaymentHistory {
  public id: string;
  public currency: string;
  public dueDate: string;
  public created: string;
  public status: PaymentHistoryStatus;
  public amountPaid: number;
  public pdf: string;

}
