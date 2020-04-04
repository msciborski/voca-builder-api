import { UserViewModel } from "../../dtos/UserViewModel";
import { User } from "../../models/User";

export interface IUserService {
    addUser(userViewModel: UserViewModel),
    deleteUser(id: string),
    getUser(id: string) : Promise<User>,
    getUsers() : Promise<User[]>,
}