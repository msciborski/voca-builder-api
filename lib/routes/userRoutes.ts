import { UserController } from "../controllers/userController";

export class UserRoutes {
  public userContrller: UserController = new UserController();

  public routes(app): void {
    app.route('/user')
      .post(this.userContrller.addUser);
    app.route('/user/:userId')
      .get(this.userContrller.getUser);
    }
}