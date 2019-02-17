import * as mongoose from "mongoose";
import { Request, Response } from "express";
import { UserSchema } from "../models/userModel";
import { TranslationService } from "../services/translationService";

const User = mongoose.model('User', UserSchema);
export class MemoController {
  public translationService: TranslationService = new TranslationService();

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

  public addMemo(req: Request, res: Response) : void {
    const { sourceWord } = req.body;
    console.log(sourceWord);
    console.log(this.translationService);
    // const language = this.translationService.detectLanguageOfText(sourceWord);
    // console.log(language);
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