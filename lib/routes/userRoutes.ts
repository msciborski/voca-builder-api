import { Request, Response} from "express";
import { UserController } from "../controllers/userController";

export class UserRoutes {
  public userContrller: UserController = new UserController();
  public routes(app): void {
    app.route('/user')
      .post(this.userContrller.addUser);
  }
}