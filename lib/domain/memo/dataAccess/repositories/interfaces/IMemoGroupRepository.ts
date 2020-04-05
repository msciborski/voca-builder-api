import { IRepository } from "../../../../../utils/repository/interfaces/IRepository";
import { MemoGroup } from "../../../models/MemoGroup";

export interface IMemoGroupRepository extends IRepository<MemoGroup> {
    getMemoGroupsForOwner(ownerId: string) : Promise<MemoGroup[]>,
}