import { UtilsController } from "../controllers/utilsController";

export class UtilsRoutes {
  public utilsController: UtilsController = new UtilsController();
  public routes(app) : void {
    app.route('/language')
      .get(this.utilsController.getAvailableLanguages);
  }
}