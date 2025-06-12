import {PaymentInfo} from './payment-info';

export class User {

    public id: number;
    public name: string;
    public email: string;
    public username: string;
    public newPassword: string;
    public urls: string[];
    public paymentInfo: PaymentInfo;
    public lastAccess: string;
    public description: string;
    public role: string;
    public phone: string;
    public contacted: boolean;

}

