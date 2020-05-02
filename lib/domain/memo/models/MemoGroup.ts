import { Memo, MemoModel } from "./Memo";
import { prop, Ref, getModelForClass, arrayProp, mongoose } from "@typegoose/typegoose";

export class MemoGroup {
    @prop()
    _id: string;

    @prop()
    name: string;

    @prop()
    ownerId: string;

    @arrayProp({ ref: 'Memo', refType: mongoose.Schema.Types.String })
    memos: Ref<Memo, string>[];

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