import { User } from './User';

export class Signup {
    SignupId: Number;
    User: User;
    Activity: string;
    Comments: string;

    constructor(data: {
        SignupId?: Number,
        User?: User,
        Activity?: string;
        Comments?: string  
    } = {}) {
        this.SignupId = data.SignupId;
        this.User = data.User;
        this.Activity = data.Activity;
        this.Comments = data.Comments;
    }
}