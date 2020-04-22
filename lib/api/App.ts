import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as morgan from "morgan";
import * as cors from "cors";
import * as jwt from "express-jwt";
import * as jwksRsa from "jwks-rsa";
import "./controllers/TestController";
import "./controllers/UserController";
import "./controllers/MemoGroupController";
// import { MemoRoutes } from "./routes/MemoRoutes";
// import { UserRoutes } from "./routes/UserRoutes";
import { UtilsRoutes } from "./routes/UtilsRoutes";
import { Container } from "inversify";
import { InversifyExpressServer, getRouteInfo } from "inversify-express-utils";

const ENV = process.env.NODE_ENV || 'development';
// const config = require('../../config.js')[ENV];
import { config } from "../../config";
import { Auth0AuthProvider } from "./auth/Auth0AuthProvider";
import UserContainer  from "../domain/user/UserContainer";
import MemoContainer from "../domain/memo/MemoContainer";
import { MemoModel } from "domain/memo/models/Memo";


class App {
  public app: express.Application;
  public mongoUrl: string = config.development.dbConnectionString;
  public utilsRoutes: UtilsRoutes = new UtilsRoutes();
  public container: Container = new Container();

  constructor() {
    this.app = express();
    this.config();
    this.configureContainer();

    this.configMorgan();
    this.configMongo();
  }

  private config(): void {
    // application/json
    this.app.use(bodyParser.json());

    // applicatin/x-www-form-urlencoded
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());
  }

  private configureContainer(): void {
    this.container.load(UserContainer);
    this.container.load(MemoContainer);
  }

  // Probably remove and we have to handl
  private configMongo(): void {
    (<any>mongoose).Promise = global.Promise;
    mongoose.connect(this.mongoUrl, { useNewUrlParser: true })
      .then(() => {
      console.log('Connection to mongo successful');
    })
    .catch(err => console.log(err));
  }


  private configMorgan(): void {
    // Logg error
    this.app.use(morgan('dev', {
      skip: (req: Request, res: Response) => res.status < 400,
      stream: process.stderr,
    }));

    // Logg success
    this.app.use(morgan('dev', {
      skip: (req: Request, res: Response) => res.status >= 400,
      stream: process.stdout,
    }));
  }
}

const app = new App();

const inversifyServer = new InversifyExpressServer(app.container, null, null, app.app, Auth0AuthProvider)
      .build();

const routeInfo = getRouteInfo(app.container)
console.log(routeInfo);

export default inversifyServer;