import { ITranslationService } from "./interfaces/ITranslationService";
import MEMO_TYPES from "../types";
import { inject, injectable } from "inversify";
import { Translate } from "@google-cloud/translate";
import { LanguageReadViewModel } from "../viewModels/translate/LanguageReadViewModel";
import { TranslateWordOptions } from "../viewModels/translate/TranslateWordOptions";

const translateClient = inject(MEMO_TYPES.Translate);

@injectable()
export class TranslationService implements ITranslationService {
    @translateClient _translateClient: Translate;

    async detectLanguageOfText(textToDetect: string): Promise<string> {
        const result = await this._translateClient.detect(textToDetect);

        if (result[0]) {
            return result[0].language;
        }
    }

    async translateText(textToTranslate: string, options: TranslateWordOptions): Promise<string> {
        const result = await this._translateClient.translate(textToTranslate, options)
        
        if (result[0]) {
            return result[0];
        }
    }

    async getAvailabeLanguages(): Promise<LanguageReadViewModel[]> {
        const result = await this._translateClient.getLanguages();

        if (result[0]) {
            return result[0];
        }
    }

}