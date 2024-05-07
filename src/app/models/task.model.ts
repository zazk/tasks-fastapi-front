import { User } from "./user.model";

enum ETypeTask {
    active = 'Active',
    archived = 'Archived',
    deleted = 'Deleted',
}

export class Task {
    id?: any;
    title?: string | null;
    description?: string | null;
    status?: boolean;
    typeTask?: ETypeTask;
    user_id?: number | null;
    user?: User

    public constructor(init?: Partial<Task>) {
        Object.assign(this, init);
    }
}
