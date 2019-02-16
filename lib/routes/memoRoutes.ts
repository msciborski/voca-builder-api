import { Request, Response } from "express";
import { MemoController } from "../controllers/memoController";

export class MemoRoutes {
  public memoController: MemoController = new MemoController();

  public routes(app): void {
    app.route('/user/:userId/memo')
      .get(this.memoController.getMemos)
      .post(this.memoController.addMemo);

    app.route('/user/:userId/memo/:memoId')
      .get(this.memoController.getMemo);
  }

}