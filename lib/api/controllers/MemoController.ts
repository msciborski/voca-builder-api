// import * as mongoose from "mongoose";
// import { Request, Response } from "express";
// import logger from "../WinstonLogger";
// import { IUserService } from "../../domain/user/services/interfaces/IUserService";
import { inject } from "inversify";
import { controller, BaseHttpController, httpGet, httpPost, requestBody, requestParam} from "inversify-express-utils";
import { MemoCreateViewModel } from "../../domain/memo/viewModels/memo/MemoCreateViewModel";
import MEMO_TYPES from "../../domain/memo/types";
import USER_TYPES from "../../domain/user/types";
import { IMemoService } from "../../domain/memo/services/interfaces/IMemoService";
import { IMemoGroupService } from "../../domain/memo/services/interfaces/IMemoGroupService";
import { IUserService } from "domain/user/services/interfaces/IUserService";

const memoService = inject(MEMO_TYPES.IMemoService);
const memoGroupService = inject(MEMO_TYPES.IMemoGroupService);
const userService = inject(USER_TYPES.IUserService);

@controller('/memogroups')
export class MemoController extends BaseHttpController {
    @memoService _memoService: IMemoService;
    @memoGroupService _memoGroupService: IMemoGroupService;
    @userService _userService: IUserService;

    @httpPost("/:memoGroupId/memos")
    public async addMemo(@requestParam("memoGroupId") memoGroupId: string, @requestBody() memoCreateViewModel: MemoCreateViewModel) {
        if (this.httpContext.user.isAuthenticated()) {
            const user = await this._userService.getUser(this.httpContext.user.details.id);
            const createdMemo = await this._memoService.addMemo(memoCreateViewModel, user);
            const memoGroup = await this._memoGroupService.addMemoToMemoGroup(memoGroupId, createdMemo);

            return this.ok(memoGroup);
        }
    }
}
