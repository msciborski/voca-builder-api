// import * as mongoose from "mongoose";
// import { Request, Response } from "express";
// import logger from "../WinstonLogger";
// import { IUserService } from "../../domain/user/services/interfaces/IUserService";
import { inject } from "inversify";
import { controller, BaseHttpController, httpGet, httpPost, requestBody} from "inversify-express-utils";


// const userService = inject(USER_TYPES.IUserService)
@controller('/memos')
export class MemoController extends BaseHttpController {

    @httpPost("")
    public async addMemo() {
        
    }
}
