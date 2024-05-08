import { Task } from "./task.model";

export class User {
    id?: any;
    username?: string;
    email?: string;
    fullname?: string;
    password?: string;
    token?: string;
    status?: boolean;
    tasks?: Task[];
}

export interface UserLogin {
    email: string;
    password: string;
}