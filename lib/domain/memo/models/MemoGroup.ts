import { Memo } from "./Memo";
import { prop, Ref, getModelForClass, arrayProp } from "@typegoose/typegoose";

export class MemoGroup {
    @prop()
    _id: string;

    @prop()
    name: string;

    @prop()
    ownerId: string;

    @arrayProp({ ref: 'Memo' })
    memos: Ref<Memo[]>;

    constructor(id: string, name: string, ownerId: string) {
        this._id = id;
        this.name = name;
    }
    
    public addMemo(memo: Memo) {
        // Todo: Validate - where? how? 
        this.memos.push(memo);
    }

    public removeMemo(memoId: string) {
        this.memos = this.memos.filter(m => m._id == memoId);
    }
}

export const MemoGroupModel = getModelForClass(MemoGroup);