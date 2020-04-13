// import * as mongoose from "mongoose";
// import { Request, Response } from "express";
// import logger from "../WinstonLogger";
// import { IUserService } from "../../domain/user/services/interfaces/IUserService";


// export class UserController {
//   private logger;
//   private userService: IUserService;

//   constructor(logger, userService: IUserService) {
//     this.logger = logger;
//     this.userService = userService;
//   }
//   // public logger = logger(__filename);
  
//   public addUser = (req: Request, res: Response) => {
//     this.userService.addUser(req.body).then(user => {
//       res.send(user);
//     })
//     .catch(err => {
//       this.logger.error(err);
//       res.send(err);
//     })
//   }

//   public getUser = (req: Request, res: Response) => {
//     const { userId } = req.params;

//     this.userService.getUser(userId).then(user => {
//       res.send(user);
//     })
//     .catch(err => {
//       this.logger.error(err);
//       res.send(err);
//     })
//   }
// }