import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";

class App {
  public app: express.Application;
  public mongoUrl: String = 'mongodb://localhost/VocaBuilderDb';

  constructor() {
    this.config();
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
}

export default new App().app;