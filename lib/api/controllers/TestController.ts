import "reflect-metadata";
import { controller, httpGet, BaseHttpController } from "inversify-express-utils";


@controller('/test')
export class TestController extends BaseHttpController {
    @httpGet('/')
    public async get()  {
        if (this.httpContext.user.isAuthenticated()) {
            return this.ok(this.httpContext.user.details.id);
        } 
    }
}