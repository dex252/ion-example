export class User
{
    public id: number;

    public login: string;
    public password: string;
    public token: string;
    public name: string;

    constructor(login?: string, password?: string) {
        this.login = login;
        this.password = password;
    }
}