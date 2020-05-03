import { LanguageReadViewModel } from "../../viewModels/translate/LanguageReadViewModel";
import { TranslateWordOptions } from "../../viewModels/translate/TranslateWordOptions";

export interface ITranslationService {
    detectLanguageOfText(textToDetect: string): Promise<string>,
    translateText(textToTranslate: string, options: TranslateWordOptions): Promise<string>,
    getAvailabeLanguages() : Promise<LanguageReadViewModel[]>,
}