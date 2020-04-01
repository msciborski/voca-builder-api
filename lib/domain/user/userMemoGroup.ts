export class UserMemoGroup {
    private memoGroupId: string;

    constructor(memoGroupId: string) {
        this.memoGroupId = memoGroupId;
    }

    public getMemoGroupId() : string {
        return this.memoGroupId;
    }
}