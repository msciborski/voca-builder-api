import { MemoGroupReadViewModel } from "../../viewModels/memoGroup/MemoGroupReadViewModel";
import { MemoGroupCreateViewModel } from "../../viewModels/memoGroup/MemoGroupCreateViewModel";
import { MemoCreateViewModel } from "domain/memo/viewModels/memo/MemoCreateViewModel";

export interface IMemoGroupService {
    createMemoGroup(memoGroup: MemoGroupCreateViewModel) : Promise<MemoGroupReadViewModel>,
    removeMemoGroup(id: string),

    getMemoGroup(id: string) : Promise<MemoGroupReadViewModel>,
    getOwnerMemoGroups(userId: string) : Promise<MemoGroupReadViewModel[]>,
    
    addMemoToMemoGroup(memoGroupId: string, memo: MemoCreateViewModel),
    removeMemoFromMemoGroup(memoGroupId: string, memoId: string),

    copyMemo(sourceMemoGroupId: string, memoId: string, destinationMemoGroupId: string),
    moveMemo(sourceMemoGroupId: string, memoId: string, destinationMemoGroupId: string),
}