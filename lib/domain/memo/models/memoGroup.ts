import { Memo } from "./memo";

export class MemoGroup {
    private id: string;
    private name: string;
    private memos: Memo[] = [];

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }

    public getId() : string {
        return this.id;
    }

    public getName() : string {
        return this.name;
    }

    public getMemos() : Memo[] {
        return this.memos;
    }

    public addMemo(memo: Memo) : void {
        this.memos.push(memo);
    }

    public removeMemo(memo: Memo) : void {
        this.memos = this.memos.filter(m => m.getId() !== memo.getId());
    }
}