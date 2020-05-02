import { ContainerModule, interfaces } from "inversify";
import { IMemoGroupService } from "./services/interfaces/IMemoGroupService";
import { MemoGroupService } from "./services/MemoGroupService";
import { IMemoGroupRepository } from "./dataAccess/repositories/interfaces/IMemoGroupRepository";
import { MemoGroupRepository } from "./dataAccess/repositories/MemoGroupRepsitory";
import MEMO_TYPES from "./types";
import { IMemoRepository } from "./dataAccess/repositories/interfaces/IMemoRepository";
import { MemoRepository } from "./dataAccess/repositories/MemoRepository";
import { IMemoService } from "./services/interfaces/IMemoService";
import { MemoService } from "./services/MemoService";

export default new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind<IMemoGroupService>(MEMO_TYPES.IMemoGroupService).to(MemoGroupService);
    bind<IMemoGroupRepository>(MEMO_TYPES.IMemoGroupRepository).to(MemoGroupRepository);
    bind<IMemoRepository>(MEMO_TYPES.IMemoRepository).to(MemoRepository);
    bind<IMemoService>(MEMO_TYPES.IMemoService).to(MemoService);
})