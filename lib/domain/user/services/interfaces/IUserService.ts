import { UserCreateViewModel } from "../../viewModels/UserCreateViewModel";
import { AddMemoGroupViewModel } from "../../viewModels/AddMemoGroupViewModel";
import { UserReadViewModel } from "../../viewModels/UserReadViewModel";

export interface IUserService {
    addUser(userViewModel: UserCreateViewModel) : Promise<UserReadViewModel>,
    deleteUser(id: string),
    getUser(id: string) : Promise<UserReadViewModel>,
    getUsers() : Promise<UserReadViewModel[]>,
    addMemoGroup(addMemoGroupViewModel: AddMemoGroupViewModel),
}