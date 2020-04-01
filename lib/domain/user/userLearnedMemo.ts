export class UserLearnedMemo {
    private memoId: string;

    constructor(memoId: string) {
        this.memoId = memoId;
    }

    public getMemoId() : string {
        return this.memoId;
    }
}