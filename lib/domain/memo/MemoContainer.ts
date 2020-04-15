import { ContainerModule, interfaces } from "inversify";
import { IMemoGroupService } from "./services/interfaces/IMemoGroupService";
import { MemoGroupService } from "./services/MemoGroupService";
import { IMemoGroupRepository } from "./dataAccess/repositories/interfaces/IMemoGroupRepository";
import { MemoGroupRepository } from "./dataAccess/repositories/MemoGroupRepsitory";
import MEMO_TYPES from "./types";

export default new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind<IMemoGroupService>(MEMO_TYPES.IMemoGroupService).to(MemoGroupService);
    bind<IMemoGroupRepository>(MEMO_TYPES.IMemoGroupRepository).to(MemoGroupRepository);
})