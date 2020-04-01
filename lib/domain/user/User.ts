import { UserMemoGroup } from "./UserMemoGroup";
import { UserLearnedMemo } from "./UserLearnedMemo";

export class User {
    private id: string;
    
    private userMemoGroups: UserMemoGroup[] = [];
    private userLearnedMemos: UserLearnedMemo[] = [];

    constructor(id: string) {
        this.id = id;
    }

    public getId() : string {
        return this.id;
    }

    public getUserMemoGroups() : UserMemoGroup[] {
        return this.userMemoGroups;
    }

    public getUserLearnedMemoos() : UserLearnedMemo[] {
        return this.userLearnedMemos;
    }
}