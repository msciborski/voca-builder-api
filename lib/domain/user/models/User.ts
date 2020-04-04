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

    constructor(_id: string, sourceLangauge: string, destinationLanguage: string) {
        this._id = _id;
        this.sourceLanguage = sourceLangauge;
        this.destinationLanguage = destinationLanguage;
    }

    public addUserMemoGroup(userMemoGroup: UserMemoGroup) {
        //TODO: Utils method for this type of check
        if (this.userMemoGroups.some(mg => mg.memoGroupId == userMemoGroup.memoGroupId)) {
            // throw exception
        }

        this.userMemoGroups.push(userMemoGroup);
    }

    public addUserLearnedMemo(userLearnedMemo: UserLearnedMemo) {
        if (this.userLearnedMemos.some(lm => lm.memoId == userLearnedMemo.memoId)) {
            // throw exception
        }

        this.userLearnedMemos.push(userLearnedMemo);
    } 
}

export const UserModel = getModelForClass(User);