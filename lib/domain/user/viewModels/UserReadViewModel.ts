import { UserMemoGroupReadViewModel } from "./UserMemoGroupReadViewModel";
import { UserLearnedMemoReadViewModel } from "./UserLearnedMemoViewModel";

export interface UserReadViewModel {
    id: string,
    sourceLanguage: string,
    destinationLanguage: string,
    userMemoGroups: UserMemoGroupReadViewModel[],
    userLearnedMemos: UserLearnedMemoReadViewModel[],
}