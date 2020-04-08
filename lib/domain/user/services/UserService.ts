import { IUserService } from "./interfaces/IUserService";
import { IUserRepository } from "../dataAccess/repositories/interfaces/IUserRepository";
import { UserCreateViewModel } from "../viewModels/UserCreateViewModel";
import { User } from "../models/User";
import { AddMemoGroupViewModel } from "../viewModels/AddMemoGroupViewModel";
import { UserMemoGroup } from "../models/UserMemoGroup";
import { AddLearnedMemoViewModel } from "../viewModels/AddLearnedMemoViewModel";
import { UserLearnedMemo } from "../models/UserLearnedMemo";
import { UserReadViewModel } from "../viewModels/UserReadViewModel";

export class UserService implements IUserService {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    public async addUser(userViewModel: UserCreateViewModel) : Promise<UserReadViewModel> {
        const user = await this.userRepository
            .add(new User(userViewModel.id, userViewModel.sourceLanguage, userViewModel.destinationLanguage))
        
        return {
            id: user._id,
            sourceLanguage: user.sourceLanguage,
            destinationLanguage: user.destinationLanguage,
            userLearnedMemos: user.userLearnedMemos,
            userMemoGroups: user.userMemoGroups,
        };
    }

    public async deleteUser(id: string) {
        await this.userRepository.delete(id)
    }

    public async getUser(id: string) : Promise<UserReadViewModel> {
        const user = await this.userRepository.getById(id);

        return {
            id: user._id,
            sourceLanguage: user.sourceLanguage,
            destinationLanguage: user.destinationLanguage,
            userLearnedMemos: user.userLearnedMemos,
            userMemoGroups: user.userMemoGroups,
        };
    }

    public async getUsers() : Promise<UserReadViewModel[]> {
        const users = await this.userRepository.getAll();

        return users.map(u => ({
            id: u._id,
            sourceLanguage: u.sourceLanguage,
            destinationLanguage: u.destinationLanguage,
            userLearnedMemos: u.userLearnedMemos,
            userMemoGroups: u.userMemoGroups,
        }));
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