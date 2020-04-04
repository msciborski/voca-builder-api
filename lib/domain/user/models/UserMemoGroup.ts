import { prop, getModelForClass } from "@typegoose/typegoose";

export class UserMemoGroup {
    @prop()
    public memoGroupId: string;
}

export const UserMemoGroupModel = getModelForClass(UserMemoGroup);