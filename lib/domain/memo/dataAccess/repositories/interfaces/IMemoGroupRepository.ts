import { IRepository } from "../../../../../utils/repository/interfaces/IRepository";
import { MemoGroup } from "../../../models/MemoGroup";
import { MemoCreateViewModel } from "../../../viewModels/memo/MemoCreateViewModel";

export interface IMemoGroupRepository extends IRepository<MemoGroup> {
    getMemoGroupsForOwner(ownerId: string) : Promise<MemoGroup[]>,
    addMemoToMemoGroup(memoGroupId: string, memoId: string) : Promise<MemoGroup>,
}