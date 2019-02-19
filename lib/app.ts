import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as morgan from "morgan";
import { MemoRoutes } from "./routes/memoRoutes";
import { UserRoutes } from "./routes/userRoutes";
import { UtilsRoutes } from "./routes/utilsRoutes";
import { POINT_CONVERSION_COMPRESSED } from "constants";

class App {
  public app: express.Application;
  public mongoUrl: String = 'mongodb://localhost/vocaBuilderDb';
  public memoRoutes: MemoRoutes = new MemoRoutes();
  public userRoutes: UserRoutes = new UserRoutes();
  public utilsRoutes: UtilsRoutes = new UtilsRoutes();

  constructor() {
    this.app = express();
    this.config();

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
  }

  private configMongo(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(this.mongoUrl);
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

export default new App().app;