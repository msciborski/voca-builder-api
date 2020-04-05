import { IMemoGroupService } from "./interfaces/IMemoGroupService";
import { IMemoGroupRepository } from "../dataAccess/repositories/interfaces/IMemoGroupRepository";
import { MemoGroupCreateViewModel } from "../viewModels/memoGroup/MemoGroupCreateViewModel";
import { MemoGroupReadViewModel } from "../viewModels/memoGroup/MemoGroupReadViewModel";
import { MemoCreateViewModel } from "../viewModels/memo/MemoCreateViewModel";
import { MemoGroup } from "../models/MemoGroup";

export class MemoGroupService implements IMemoGroupService {
    private memoGroupRepository: IMemoGroupRepository;

    constructor(memoGroupRepository: IMemoGroupRepository) {
        this.memoGroupRepository = memoGroupRepository;
    }

    async createMemoGroup(memoGroup: MemoGroupCreateViewModel) : Promise<MemoGroupReadViewModel> {
        const addedMemoGroup = await this.memoGroupRepository.add(new MemoGroup(memoGroup._id, memoGroup.name, memoGroup.ownerId));


        return {
            id: addedMemoGroup._id,
            name: addedMemoGroup.name,
            ownerId: addedMemoGroup.ownerId,
            memos: [],
        };
    }

    removeMemoGroup(id: string) {
        throw new Error("Method not implemented.");
    }

    async getMemoGroup(id: string): Promise<MemoGroupReadViewModel> {
        const memoGroup = await this.memoGroupRepository.getById(id);

        return {
            id: memoGroup._id,
            name: memoGroup.name,
            ownerId: memoGroup.ownerId,
            memos: memoGroup.memos,
        };
    }

    async getOwnerMemoGroups(userId: string): Promise<MemoGroupReadViewModel[]> {
        const ownerMemoGroups = await this.memoGroupRepository.getMemoGroupsForOwner(userId);
        const ownerMemoGroupsViewModel = ownerMemoGroups.map(mg => { return {
            id: mg._id,
            name: mg.name,
            ownerId: mg.ownerId,
            memos: mg.memos,
        }});

        return ownerMemoGroupsViewModel;
    }

    addMemoToMemoGroup(memoGroupId: string, memo: MemoCreateViewModel) {
        throw new Error("Method not implemented.");
    }
    removeMemoFromMemoGroup(memoGroupId: string, memoId: string) {
        throw new Error("Method not implemented.");
    }
    copyMemo(sourceMemoGroupId: string, memoId: string, destinationMemoGroupId: string) {
        throw new Error("Method not implemented.");
    }
    moveMemo(sourceMemoGroupId: string, memoId: string, destinationMemoGroupId: string) {
        throw new Error("Method not implemented.");
    }

}