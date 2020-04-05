import { MemoReadViewModel } from "../memo/MemoReadViewModel";

export interface MemoGroupReadViewModel {
   id: string,
   name: string,
   ownerId: string,
   memos: MemoReadViewModel[], 
}