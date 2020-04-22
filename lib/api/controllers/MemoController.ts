// import * as mongoose from "mongoose";
// import { Request, Response } from "express";
// import logger from "../WinstonLogger";
// import { IUserService } from "../../domain/user/services/interfaces/IUserService";
import { inject } from "inversify";
import { controller, BaseHttpController, httpGet, httpPost, requestBody, requestParam} from "inversify-express-utils";
import { MemoCreateViewModel } from "../../domain/memo/viewModels/memo/MemoCreateViewModel";


// const userService = inject(USER_TYPES.IUserService)
@controller('/memogroups')
export class MemoController extends BaseHttpController {

    @httpPost(":memoGroupId/memos")
    public async addMemo(@requestParam() memoGroupId: string, @requestBody() memoCreateViewModel: MemoCreateViewModel) {
        
    }
}
