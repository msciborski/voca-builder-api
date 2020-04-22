import { UserMemoGroup } from "./UserMemoGroup";
import { UserLearnedMemo } from "./UserLearnedMemo";

import { prop, arrayProp, getModelForClass, ReturnModelType } from "@typegoose/typegoose";

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

    public get id() {
        return this._id;
    }

    constructor(_id: string, sourceLangauge: string, destinationLanguage: string) {
        this._id = _id;
        this.sourceLanguage = sourceLangauge;
        this.destinationLanguage = destinationLanguage;
    }
}

export const UserModel: ReturnModelType<typeof User> = getModelForClass(User);