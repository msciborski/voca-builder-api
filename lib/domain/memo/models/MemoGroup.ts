import { Memo } from "./Memo";
import { prop, arrayProp, getModelForClass } from "@typegoose/typegoose";

export class MemoGroup {
    @prop()
    _id: string;

    @prop()
    name: string;

    @prop()
    ownerId: string;

    @arrayProp({ _id: true, items: Memo})
    memos: Memo[] = [];

    constructor(id: string, name: string, ownerId: string) {
        this._id = id;
        this.name = name;
    }   
}

export const MemoGroupModel = getModelForClass(MemoGroup);