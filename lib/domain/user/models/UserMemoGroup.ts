import { prop, getModelForClass } from "@typegoose/typegoose";

export class UserMemoGroup {
    @prop()
    public memoGroupId: string;

    constructor(memoGroupId: string) {
        this.memoGroupId = memoGroupId;
    }
}

//TODO: Do I need it?
export const UserMemoGroupModel = getModelForClass(UserMemoGroup);