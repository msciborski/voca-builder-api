import * as mongoose from "mongoose";
import { Request, Response } from "express";
import { UserSchema } from "../models/userModel";
import { TranslationService } from "../services/translationService";
import logger from '../winstonLogger';


const User = mongoose.model('User', UserSchema);
export class MemoController {
  public translationService: TranslationService = new TranslationService();
  public logger = logger(__filename);
  public getMemos = (req: Request, res: Response) => {
    User.findOne({ _id: req.params.userId}, 'memos', (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user.memos);
    })
  }

  public getMemo = (req: Request, res: Response) => {
    User.findOne({ _id: req.params.userId }, 'memos', (err, user) => {
      if (err) {
        this.logger.error(err);
        res.send(err);
      }

      if(user.memos === undefined) {
        this.logger.info(`No memos for user ${req.params.userId}`);
        res.json([]);
      }

      const { memos } = user;
      const memosWithId = memos.filter(m => m._id == req.params.memoId);

      if(memosWithId.length > 0) {
        this.logger.info(`Returning memo ${memosWithId[0]._id} for user: ${req.params.userId}`);
        res.json(memosWithId[0]);
      }

      this.logger.warn(`Memo with id: ${req.params.memoId} not found`);
      res.sendStatus(400);
    })
  }

  public addMemo = async (req: Request, res: Response) => {
    const { sourceWord } = req.body;
    const user = await User.findOne({_id: req.params.userId});

    try {
      const { language } = await this.translationService.detectLanguageOfText(sourceWord);
      this.logger.info(`Language of word: ${sourceWord}: ${language}`);

      let translatedWord;
      if(language === user.destinationLanguage) {
        this.logger.info(`Translating ${sourceWord} from ${language} to ${user.sourceLanguage}`);
        translatedWord = await this.translationService.translateWord(sourceWord, user.destinationLanguage, user.sourceLanguage);
      } else {
        this.logger.info(`Translating ${sourceWord} from ${user.sourceLanguage} to ${user.destinationLanguage}`);
        translatedWord = await this.translationService.translateWord(sourceWord, user.sourceLanguage, user.destinationLanguage);
      }

      User.updateOne(
        { _id: req.params.userId },
        { $push: { memos: { sourceWord, translatedWord } } }
      ).exec((err) => {
        if (err) {
          this.logger.error(err);
          res.send(err);
        }

        this.logger.info(`Memo add for user: ${req.params.userId}`);
        res.sendStatus(204);
      });
    } catch (error) {
      this.logger.error(error);
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
          this.logger.error(err);
        }

        this.logger.info(`Update memo: ${req.params.memoId}.`);
        res.sendStatus(200);
      }
    )
  }
}