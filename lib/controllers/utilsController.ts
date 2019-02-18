import { Request, Response } from "express";
import { TranslationService } from "../services/translationService";

export class UtilsController {
  public translationService: TranslationService = new TranslationService();

  public getAvailableLanguages = async (req: Request, res: Response) => {
    try {
      const languages = await this.translationService.getAvailabeLanguages();
      res.send(languages[0]);
    } catch (error) {
      res.send(error);
    }
  }
}