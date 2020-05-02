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
import { IMemoService } from "./interfaces/IMemoService";
import { MemoReadViewModel } from "../viewModels/memo/MemoReadViewModel";
import { mapArrayOptions } from "@typegoose/typegoose/lib/internal/utils";

const memoGroupRepository = inject(MEMO_TYPES.IMemoGroupRepository);
const memoService = inject(MEMO_TYPES.IMemoService);

@injectable()
export class MemoGroupService implements IMemoGroupService {
    @memoGroupRepository _memoGroupRepository: IMemoGroupRepository;
    @memoService _memoService: IMemoService

    async createMemoGroup(memoGroup: MemoGroupCreateViewModel) : Promise<MemoGroupReadViewModel> {
        const addedMemoGroup = await this._memoGroupRepository.add(new MemoGroup(uuidv4(), memoGroup.name, memoGroup.ownerId));

        return {
            id: addedMemoGroup._id,
            name: addedMemoGroup.name,
            ownerId: addedMemoGroup.ownerId,
            memos: addedMemoGroup.memos as MemoReadViewModel[],
        };
    }

    removeMemoGroup(id: string) {
        throw new Error("Method not implemented.");
    }

    async getMemoGroup(id: string): Promise<MemoGroupReadViewModel> {
        const memoGroup = await this._memoGroupRepository.getById(id);

        return {
            id: memoGroup._id,
            name: memoGroup.name,
            ownerId: memoGroup.ownerId,
            memos: memoGroup.memos as MemoReadViewModel[]
        }
    }

    async getOwnerMemoGroups(userId: string): Promise<MemoGroupReadViewModel[]> {
        const ownerMemoGroups = await this._memoGroupRepository.getMemoGroupsForOwner(userId);

        return ownerMemoGroups.map(md => { return { 
            id: md.id, 
            name: md.name, 
            ownerId: md.ownerId, 
            memos: md.memos as MemoReadViewModel[]} 
        });
    }

    async addMemoToMemoGroup(memoGroupId: string, memoCreateViewModel: MemoCreateViewModel) {
        const memo = await this._memoService.addMemo(memoCreateViewModel);
        const memoGroup = await this._memoGroupRepository.addMemoToMemoGroup(memoGroupId, memo.id);

        return memoGroup;
    }

    async removeMemoFromMemoGroup(memoGroupId: string, memoId: string) {
        const memoGroup = await this._memoGroupRepository.getById(memoGroupId);
        // memoGroup.removeMemo(memoId);

        await this._memoGroupRepository.update(memoGroup);
    }

    copyMemo(sourceMemoGroupId: string, memoId: string, destinationMemoGroupId: string) {
        throw new Error("Method not implemented.");
    }
    moveMemo(sourceMemoGroupId: string, memoId: string, destinationMemoGroupId: string) {
        throw new Error("Method not implemented.");
    }

}