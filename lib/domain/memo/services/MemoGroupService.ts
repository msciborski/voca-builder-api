import { IMemoGroupService } from "./interfaces/IMemoGroupService";
import { IMemoGroupRepository } from "../dataAccess/repositories/interfaces/IMemoGroupRepository";
import { MemoGroupCreateViewModel } from "../viewModels/memoGroup/MemoGroupCreateViewModel";
import { MemoGroupReadViewModel } from "../viewModels/memoGroup/MemoGroupReadViewModel";
import { MemoCreateViewModel } from "../viewModels/memo/MemoCreateViewModel";
import { MemoGroup } from "../models/MemoGroup";
import { Memo } from "../models/Memo";
import { injectable, inject } from "inversify";
import MEMO_TYPES from "../types";
import { v4 as uuidv4 } from "uuid";

@injectable()
export class MemoGroupService implements IMemoGroupService {
    private memoGroupRepository: IMemoGroupRepository;

    constructor(
        @inject(MEMO_TYPES.IMemoGroupRepository) memoGroupRepository: IMemoGroupRepository
    ) {
        this.memoGroupRepository = memoGroupRepository;
    }

    async createMemoGroup(memoGroup: MemoGroupCreateViewModel) : Promise<MemoGroupReadViewModel> {
        const addedMemoGroup = await this.memoGroupRepository.add(new MemoGroup(uuidv4(), memoGroup.name, memoGroup.ownerId));

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

        return ownerMemoGroups;
    }

    async addMemoToMemoGroup(memoGroupId: string, memo: MemoCreateViewModel) {
        const memoGroup = await this.memoGroupRepository.getById(memoGroupId);
        // memoGroup.addMemo(new Memo(memo.id, memo.sourceWord, memo.translatedWord));

        await this.memoGroupRepository.update(memoGroup);
    }

    async removeMemoFromMemoGroup(memoGroupId: string, memoId: string) {
        const memoGroup = await this.memoGroupRepository.getById(memoGroupId);
        // memoGroup.removeMemo(memoId);

        await this.memoGroupRepository.update(memoGroup);
    }

    copyMemo(sourceMemoGroupId: string, memoId: string, destinationMemoGroupId: string) {
        throw new Error("Method not implemented.");
    }
    moveMemo(sourceMemoGroupId: string, memoId: string, destinationMemoGroupId: string) {
        throw new Error("Method not implemented.");
    }

}