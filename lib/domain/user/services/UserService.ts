import { IUserService } from "./interfaces/IUserService";
import { IUserRepository } from "../dataAccess/repositories/interfaces/IUserRepository";
import { UserViewModel } from "../dtos/UserViewModel";
import { User } from "../models/User";

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
}