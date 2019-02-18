import * as mongoose from "mongoose";
import { Request, Response } from "express";
import { UserSchema } from "../models/userModel";
import { TranslationService } from "../services/translationService";
import { throws } from "assert";

const User = mongoose.model('User', UserSchema);
export class MemoController {
  public translationService: TranslationService = new TranslationService();

  public getMemos = (req: Request, res: Response) => {
    User.findOne({ _id: req.params.userId}, 'memos', (err, user) => {
      if (err) {
        res.send(err);
      }
      console.log(user.memos);
      res.json(user.memos);
    })
  }

  public getMemo = (req: Request, res: Response) => {
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

  public addMemo = async (req: Request, res: Response) => {
    const { sourceWord } = req.body;
    const user = await User.findOne({_id: req.params.userId});

    try {
      const { language } = await this.translationService.detectLanguageOfText(sourceWord);
      let translatedWord;
      console.log(language)

      if(language === user.destinationLanguage) {
        translatedWord = await this.translationService.translateWord(sourceWord, 'en', 'pl');
      } else {
        translatedWord = await this.translationService.translateWord(sourceWord, 'pl', 'en');
      }

      User.updateOne(
        { _id: req.params.userId },
        { $push: { memos: { sourceWord, translatedWord } } }
      ).exec((err) => {
        if (err) {
          res.send(err);
        }
        res.sendStatus(204);
      });
    } catch (error) {
      res.send(error);
    }

  }

  public updateMemo = (req: Request, res: Response) => {
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