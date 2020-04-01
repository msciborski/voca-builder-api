import { Request, Response } from "express";
import { TranslationService } from "../../services/translationService";
import logger from "../winstonLogger";

export class UtilsController {
  public translationService: TranslationService = new TranslationService();
  public logger = logger(__filename);

  public getAvailableLanguages = async (req: Request, res: Response) => {
    try {
      const languages = await this.translationService.getAvailabeLanguages();
      res.send(languages[0]);
    } catch (error) {
      this.logger.error(error);
      res.send(error);
    }
  }
}