import * as mongoose from "mongoose";
import { Request, Response } from "express";
import { UserSchema } from "../models/userModel";

const User = mongoose.model('User', UserSchema);
export class MemoController {

  public getMemos(req: Request, res: Response) {
    User.findOne({ _id: req.params.userId}, 'memos', (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user.memos);
    })
  }

  public getMemo(req: Request, res: Response) {
    User.findOne({ _id: req.params.userId }, 'memos', (err, user) => {
      if (err) {
        res.send(err);
      }

      if(user.memos === undefined) {
        res.json([]);
      }

      const { memos } = user;
      res.json(memos.filter(m => m._id == req.params.memoId));
    })
  }

  public addMemo(req: Request, res: Response) {
    User.updateOne(
      { _id: req.params.userId },
      { $push: { memos: req.body } }
    ).exec((err) => {
      if (err) {
        res.send(err);
      }
      res.sendStatus(204);
    });
  }

  public updateMemo(req: Request, res: Response) {
    const { isLearned } = req.body;

    User.findOneAndUpdate(
      { _id: req.params.userId, "memos._id": req.params.memoId },
      {
        $set: {
          "memos.$.isLearned": isLearned
        }
      },
      (err) => {
        if (err) {
          res.send(err);
        }

        res.sendStatus(200);
      }
    )
  }
}