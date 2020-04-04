import { UserMemoGroup } from "./UserMemoGroup";
import { UserLearnedMemo } from "./UserLearnedMemo";

import { prop, arrayProp, getModelForClass } from "@typegoose/typegoose";

export class User {
    @prop()
    public _id: string;

    @prop()
    public sourceLanguage: string;
    
    @prop()
    public destinationLanguage: string;
    
    @arrayProp({ _id: false, items: UserMemoGroup })
    public userMemoGroups: UserMemoGroup[] = [];

    @arrayProp({ _id: false, items: UserLearnedMemo })
    public userLearnedMemos: UserLearnedMemo[] = [];
}

export const UserModel = getModelForClass(User);