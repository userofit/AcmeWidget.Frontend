export class User {
    UserId: Number;
    FirstName: string;
    LastName: string;
    Email: string;

    constructor(data: {
        UserId?: number,
        FirstName?: string,
        LastName?: string;
        Email?: string  
    } = {}) {
        this.UserId = data.UserId;
        this.FirstName = data.FirstName;
        this.LastName = data.LastName;
        this.Email = data.Email;
    }
}