export class SecurityUser {
    public id: string;
    public username: string;
    public email: string;
    public password: string;
    public submit: string;
    public name: string;
    public firstName: string;
    public lastName: string;
    public role: string;
    public language: string;

    constructor() {
        this.submit = 'Login';
    }

}
