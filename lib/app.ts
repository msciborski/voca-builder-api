import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as morgan from "morgan";
import * as cors from "cors";
import * as jwt from "express-jwt";
import * as jwksRsa from "jwks-rsa";
import { MemoRoutes } from "./routes/memoRoutes";
import { UserRoutes } from "./routes/userRoutes";
import { UtilsRoutes } from "./routes/utilsRoutes";

const ENV = process.env.NODE_ENV || 'development';
const config = require('../config.js')[ENV];

class App {
  public app: express.Application;
  public mongoUrl: String = config.dbConnectionString;
  public memoRoutes: MemoRoutes = new MemoRoutes();
  public userRoutes: UserRoutes = new UserRoutes();
  public utilsRoutes: UtilsRoutes = new UtilsRoutes();

  constructor() {
    this.app = express();
    this.config();

    this.configureAuth();

    this.memoRoutes.routes(this.app);
    this.userRoutes.routes(this.app);
    this.utilsRoutes.routes(this.app);

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

  private configureAuth(): void {
    const checkJwt = jwt({
      secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: config.jwksUri,
      }),
      audience: config.audience,
      issuer: config.issuer,
      algorithms: ['RS256']
    })

    this.app.use(checkJwt);
  }
}

export default new App().app;