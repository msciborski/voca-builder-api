import { MemoCreateViewModel } from "../memo/MemoCreateViewModel";

export interface MemoGroupCreateViewModel {
    _id: string,
    name: string,
    ownerId: string,
    memos?: MemoCreateViewModel[],
}