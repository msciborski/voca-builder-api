import { prop, getModelForClass } from "@typegoose/typegoose";

export class UserLearnedMemo {
    @prop()
    public memoId: string;

    constructor(memoId: string) {
        this.memoId = memoId;
    }
}