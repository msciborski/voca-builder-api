import { UserViewModel } from "../../viewModels/UserCreateViewModel";
import { User } from "../../models/User";
import { AddMemoGroupViewModel } from "../../viewModels/AddMemoGroupViewModel";

export interface IUserService {
    addUser(userViewModel: UserViewModel),
    deleteUser(id: string),
    getUser(id: string) : Promise<User>,
    getUsers() : Promise<User[]>,
    addMemoGroup(addMemoGroupViewModel: AddMemoGroupViewModel),
}