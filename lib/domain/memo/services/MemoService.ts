import { IMemoService } from "./interfaces/IMemoService";
import { injectable, inject } from "inversify";
import { v4 as uuidv4 } from "uuid";
import { MemoCreateViewModel } from "../viewModels/memo/MemoCreateViewModel";
import { MemoReadViewModel } from "../viewModels/memo/MemoReadViewModel";
import MEMO_TYPES from "../types";
import { IMemoRepository } from "../dataAccess/repositories/interfaces/IMemoRepository";
import { Memo } from "../models/Memo";
import { UserLanguagePreferences } from "../viewModels/translate/UserLanguagePreferences";
import { ITranslationService } from "./interfaces/ITranslationService";

const memoRepository = inject(MEMO_TYPES.IMemoRepository);
const translateService = inject(MEMO_TYPES.ITranslateService);

@injectable()
export class MemoService implements IMemoService {
    @memoRepository _memoRepository: IMemoRepository;
    @translateService _translateService: ITranslationService;

    async addMemo(memoCreateViewModel: MemoCreateViewModel, userLanguagePreferences: UserLanguagePreferences): Promise<MemoReadViewModel> {
        const translatedWord = await this.translateMemo(memoCreateViewModel.sourceWord, userLanguagePreferences);
        const memo = await this._memoRepository.add(new Memo(uuidv4(), memoCreateViewModel.sourceWord, translatedWord));

        return memo;
    }

    private async translateMemo(sourceWord: string, userLanguagePreferences: UserLanguagePreferences) : Promise<string> {
        const sourceWordLanguage = await this._translateService.detectLanguageOfText(sourceWord);

        if (sourceWordLanguage == userLanguagePreferences.sourceLanguage) {
            return await this._translateService.translateText(sourceWord, { 
                from: sourceWordLanguage, 
                to: userLanguagePreferences.destinationLanguage });
        } else if (sourceWordLanguage == userLanguagePreferences.destinationLanguage) {
            return await this._translateService.translateText(sourceWord, { 
                from: userLanguagePreferences.destinationLanguage, 
                to: userLanguagePreferences.sourceLanguage });
        }

        // Throw exception

    }

}