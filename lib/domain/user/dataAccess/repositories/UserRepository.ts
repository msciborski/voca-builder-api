import { IUserRepository } from "./interfaces/IUserRepository";
import { User, UserModel } from "../../models/User";

export class UserRepository implements IUserRepository {

    async delete(id: string): Promise<void> {
        try {
            await UserModel.findOneAndDelete({ _id: id });
        } catch (err) {
            throw err;
        }
    }

    async update(entity: User): Promise<User> {
        try {
            await UserModel.updateOne({ _id: entity._id}, entity);
            return entity;
        } catch (err) {
            throw err;
        }
    }

    async add(entity: User): Promise<boolean> {
        try {
            await UserModel.create(entity);
            return true;
        } catch (err) {
            // log
            return false;
        }
    }

    async getById(id: string): Promise<User> {
        const user = await UserModel.findById(id);

        return user;
    }

    // ToDo: Error handling
    async getAll(): Promise<User[]> {
        const users = await UserModel.find({});
        return users;
    }
}