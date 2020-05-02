import { IMemoService } from "./interfaces/IMemoService";
import { injectable, inject } from "inversify";
import { v4 as uuidv4 } from "uuid";
import { MemoCreateViewModel } from "../viewModels/memo/MemoCreateViewModel";
import { MemoReadViewModel } from "../viewModels/memo/MemoReadViewModel";
import MEMO_TYPES from "../types";
import { IMemoRepository } from "../dataAccess/repositories/interfaces/IMemoRepository";
import { Memo } from "../models/Memo";

const memoRepository = inject(MEMO_TYPES.IMemoRepository);

@injectable()
export class MemoService implements IMemoService {
    @memoRepository _memoRepository: IMemoRepository;

    async addMemo(memoCreateViewModel: MemoCreateViewModel): Promise<MemoReadViewModel> {
        //TODO: Add translation service and translate sourceWord
        const memo = await this._memoRepository.add(new Memo(uuidv4(), memoCreateViewModel.sourceWord, "TEST_TRANSLATED"));

        return memo;
    }

}