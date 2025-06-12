export class ValidationError {

    public msg: string;
    public link: string;

    constructor(msg: string, link: string) {
        this.msg = msg;
        this.link = link;
    }
}
