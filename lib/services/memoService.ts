import { TranslationService } from "./translationService";

export class MemoService {
    public translationService: TranslationService;

    public constructor(translationService: TranslationService) {
        this.translationService = translationService;
    }
}
