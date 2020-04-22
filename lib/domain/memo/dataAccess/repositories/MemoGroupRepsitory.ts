import { IMemoGroupRepository } from "./interfaces/IMemoGroupRepository";
import { MemoGroup, MemoGroupModel } from "../../models/MemoGroup";
import { injectable } from "inversify";


//TODO: Move logic to base case Repository<T>
@injectable()
export class MemoGroupRepository implements IMemoGroupRepository {    
    async delete(id: string): Promise<void> {
        try {
            await MemoGroupModel.findOneAndDelete({ _id: id});
        } catch (err) {
            throw err;
        }
    }

    async update(entity: MemoGroup): Promise<MemoGroup> {
        try {
            await MemoGroupModel.updateOne({ _id: entity._id}, entity);
            return entity;
        } catch (err) {
            throw err;
        }
    }

    async add(entity: MemoGroup): Promise<MemoGroup> {
        try {
            const memoGroup: MemoGroup = await MemoGroupModel.create(entity);
            return memoGroup;
        } catch (err) {
            throw err;
        }
    }

    async getById(id: string): Promise<MemoGroup> {
        const memoGroup = await MemoGroupModel.findById(id);

        return memoGroup;
    }

    async getAll(): Promise<MemoGroup[]> {
        const memoGroups = await MemoGroupModel.find({});
        return memoGroups;
    }

    async getMemoGroupsForOwner(ownerId: string) : Promise<MemoGroup[]> {
        const ownerMemoGroups: MemoGroup[] = await MemoGroupModel.find({ownerId: ownerId})

        return ownerMemoGroups;
    }

}