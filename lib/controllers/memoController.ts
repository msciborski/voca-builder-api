import * as mongoose from "mongoose";
import { Request, Response } from "express";
import { UserSchema } from "../models/userModel";
import { MemoSchema } from "../models/memoModel";

const User = mongoose.model('User', UserSchema);
const Memo = mongoose.model('Memo', MemoSchema);

export class MemoController {
  public getMemos(req: Request, res: Response) {
    User.findOne({ _id: req.params.userId}, 'memos', (err, memos) => {
      if (err) {
        res.send(err);
      }
      console.log(memos);
      res.json(memos);
    })
  }

  public addMemo(req: Request, res: Response) {
    console.log('Tutaj uderzylo');
    console.log(req.body);
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
}