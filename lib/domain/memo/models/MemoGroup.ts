import { Memo, MemoModel } from "./Memo";
import { prop, Ref, getModelForClass, arrayProp } from "@typegoose/typegoose";

export class MemoGroup {
    @prop()
    _id: string;

    @prop()
    name: string;

    @prop()
    ownerId: string;

    @arrayProp({ ref: 'Memo' })
    memos: Ref<Memo>[];

    public get id() {
        return this._id;
    }

    constructor(id: string, name: string, ownerId: string) {
        this._id = id;
        this.name = name;
        this.ownerId = ownerId;
    }
}

export const MemoGroupModel = getModelForClass(MemoGroup);