import { MemoCreateViewModel } from "../../viewModels/memo/MemoCreateViewModel";
import { MemoReadViewModel } from "../../viewModels/memo/MemoReadViewModel";
import { UserLanguagePreferences } from "../../viewModels/translate/UserLanguagePreferences";

export interface IMemoService {
    addMemo(memoCreateViewModel: MemoCreateViewModel, userLanguagePreferences: UserLanguagePreferences) : Promise<MemoReadViewModel>
}