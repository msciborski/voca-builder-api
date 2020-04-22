import { IMemoRepository } from "./interfaces/IMemoRepository";
import { injectable } from "inversify";
import { Memo, MemoModel } from "../../models/Memo";

@injectable()
export class MemoRepository implements IMemoRepository {
    async delete(id: string): Promise<void> {
        try {
            await MemoModel.findOneAndDelete({ _id: id })
        } catch (err) {
            throw err;
        }
    }

    async update(entity: Memo): Promise<Memo> {
        try {
            const memo = await MemoModel.updateOne({ _id: entity._id }, entity);
            return memo;
        } catch (err) {
            throw err;
        }
    }

    async add(entity: Memo): Promise<Memo> {
        try {
            const memo = await MemoModel.create(entity);
            return memo;
        } catch (err) {
            throw err;
        }
    }
    async getById(id: string): Promise<Memo> {
        const memo = await MemoModel.findById(id);
        return memo;
    }
    async getAll(): Promise<Memo[]> {
        const memoGroups = await MemoModel.find({});
        return memoGroups;
    }

}