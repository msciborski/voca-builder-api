import { prop, getModelForClass } from "@typegoose/typegoose";

export class Memo {
    @prop()
    _id: string;

    @prop()
    sourceWord: string;
    
    @prop()
    translatedWord: string;

    public get id() {
        return this._id;
    }

    constructor(id: string, sourceWord:string, translatedWord: string) {
        this._id = id;
        this.sourceWord = sourceWord;
        this.translatedWord = translatedWord;
    }

 
}

export const MemoModel = getModelForClass(Memo);