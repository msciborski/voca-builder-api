import { MemoCreateViewModel } from "../memo/MemoCreateViewModel";

export interface MemoGroupCreateViewModel {
    name: string,
    ownerId: string,
    memos?: MemoCreateViewModel[],
}