import "reflect-metadata";
import { controller, httpGet, BaseHttpController } from "inversify-express-utils";


@controller('/test')
export class TestController extends BaseHttpController {
    @httpGet('/')
    public async get()  {
        return this.ok('dupa');
    }
}