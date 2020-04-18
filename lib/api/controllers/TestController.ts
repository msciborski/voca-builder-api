import "reflect-metadata";
import { controller, httpGet, BaseHttpController } from "inversify-express-utils";
import { inject } from "inversify";
import USER_TYPES from "../../domain/user/types";
import { IUserService } from "domain/user/services/interfaces/IUserService";

const userService = inject(USER_TYPES.IUserService)
@controller('/test')
export class TestController extends BaseHttpController {
    @userService private readonly _userService: IUserService;

    @httpGet('/')
    public async get()  {
        if (this.httpContext.user.isAuthenticated()) {
            const users = await this._userService.getUsers();
            return this.ok(users);
        } 
    }
}