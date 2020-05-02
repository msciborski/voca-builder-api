import { MemoCreateViewModel } from "domain/memo/viewModels/memo/MemoCreateViewModel";
import { MemoReadViewModel } from "domain/memo/viewModels/memo/MemoReadViewModel";

export interface IMemoService {
    addMemo(memoCreateViewModel: MemoCreateViewModel) : Promise<MemoReadViewModel>
}