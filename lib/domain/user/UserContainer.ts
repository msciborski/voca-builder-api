import { ContainerModule, interfaces } from "inversify";
import { IUserService } from "./services/interfaces/IUserService";
import USER_TYPES  from "./types";
import { UserService } from "./services/UserService";
import { IUserRepository } from "./dataAccess/repositories/interfaces/IUserRepository";
import { UserRepository } from "./dataAccess/repositories/UserRepository";

export default new ContainerModule((bind: interfaces.Bind, unbing: interfaces.Unbind) => {
    bind<IUserService>(USER_TYPES.IUserService).to(UserService);
    bind<IUserRepository>(USER_TYPES.IUserRepository).to(UserRepository);
});