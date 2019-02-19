import * as mongoose from "mongoose";
import { UserSchema } from "../models/userModel";
import { Request, Response } from "express";
import logger from "../winstonLogger";

const User = mongoose.model('User', UserSchema);

export class UserController {
  public logger = logger(__filename);
  public addUser(req: Request, res: Response) {
    let newUser = new User(req.body);

    newUser.save((err, user) => {
      if (err) {
        this.logger.error(err);
        res.send(err);
      }

      this.logger.info(`User with id: ${newUser._id} was added to db`);
      res.send(user);
    })
  }
}