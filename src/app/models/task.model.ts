import { User } from "./user.model";

export class Task {
    id?: any;
    title?: string | null;
    description?: string | null;
    status?: boolean;
    typeTask? : string;
    user_id?: number | null;
    user?: User

    public constructor(init?: Partial<Task>) {
        Object.assign(this, init);
    }
}
