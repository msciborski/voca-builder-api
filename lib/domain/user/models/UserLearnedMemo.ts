import { prop, getModelForClass } from "@typegoose/typegoose";

export class UserLearnedMemo {
    @prop()
    public memoId: string;
}

export const UserLearnedMemoModel = getModelForClass(UserLearnedMemo);