import { IRepository } from "../../../../../utils/repository/interfaces/IRepository";
import { User } from "../../../models/User";
import { UserMemoGroup } from "../../../models/UserMemoGroup";

export interface IUserRepository extends IRepository<User> {
    addMemoGroupToUser(userId: string, memoGroup: UserMemoGroup) : Promise<User>
}