import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as morgan from "morgan";
import * as cors from "cors";
import * as jwt from "express-jwt";
import * as jwksRsa from "jwks-rsa";
import "./controllers/TestController";

// import { MemoRoutes } from "./routes/MemoRoutes";
// import { UserRoutes } from "./routes/UserRoutes";
import { UtilsRoutes } from "./routes/UtilsRoutes";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";

const ENV = process.env.NODE_ENV || 'development';
const config = require('../../config.js')[ENV];

import { Auth0AuthProvider } from "./auth/Auth0AuthProvider";

class App {
  public app: express.Application;
  public mongoUrl: String = config.dbConnectionString;
  // public memoRoutes: MemoRoutes = new MemoRoutes();
  // public userRoutes: UserRoutes = new UserRoutes();
  public utilsRoutes: UtilsRoutes = new UtilsRoutes();
  public container: Container = new Container();

  constructor() {
    this.app = express();
    this.config();

    // this.configureAuth();

    // this.memoRoutes.routes(this.app);
    // this.userRoutes.routes(this.app);
    // this.utilsRoutes.routes(this.app);

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

  // Probably remove and we have to handl
  private configMongo(): void {
    mongoose.Promise = global.Promise;
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

  // private configureAuth(): void {
  //   const checkJwt = jwt({
  //     secret: jwksRsa.expressJwtSecret({
  //       cache: true,
  //       rateLimit: true,
  //       jwksRequestsPerMinute: 5,
  //       jwksUri: config.authorization.jwksUri,
  //     }),
  //     audience: config.authorization.audience,
  //     issuer: config.authorization.issuer,
  //     algorithms: ['RS256']
  //   })

  //   this.app.use(checkJwt);
  // }
}

const app = new App();
export default 
  new InversifyExpressServer(app.container, null, null, app.app, Auth0AuthProvider)
      .build();