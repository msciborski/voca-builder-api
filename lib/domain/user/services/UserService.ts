import { IUserService } from "./interfaces/IUserService";
import { IUserRepository } from "../dataAccess/repositories/interfaces/IUserRepository";
import { UserViewModel } from "../viewModels/UserCreateViewModel";
import { User } from "../models/User";
import { AddMemoGroupViewModel } from "../viewModels/AddMemoGroupViewModel";
import { UserMemoGroup } from "../models/UserMemoGroup";
import { AddLearnedMemoViewModel } from "../viewModels/AddLearnedMemoViewModel";
import { UserLearnedMemo } from "../models/UserLearnedMemo";

export class UserService implements IUserService {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    public async addUser(userViewModel: UserViewModel) {
        await this.userRepository.add(new User(userViewModel.id, userViewModel.sourceLanguage, userViewModel.destinationLanguage))
    }

    public async deleteUser(id: string) {
        await this.userRepository.delete(id)
    }

    public async getUser(id: string) : Promise<User> {
        const user = await this.userRepository.getById(id);

        return user;
    }

    public async getUsers() : Promise<User[]> {
        const users = await this.userRepository.getAll();

        return users;
    }

    public async addMemoGroup(addMemoGroupViewModel: AddMemoGroupViewModel) {
        const user = await this.userRepository.getById(addMemoGroupViewModel.userId);
        user.addUserMemoGroup(new UserMemoGroup(addMemoGroupViewModel.memoGroupId));

        await this.userRepository.update(user);
    }

    public async addLearnedMemo(addLearnedMemoViewModel: AddLearnedMemoViewModel) {
        const user = await this.userRepository.getById(addLearnedMemoViewModel.userId);
        user.addUserLearnedMemo(new UserLearnedMemo(addLearnedMemoViewModel.memoId));

        await this.userRepository.update(user);
    }
}