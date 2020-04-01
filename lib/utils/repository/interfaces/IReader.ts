export interface IReader<T> {
    getById(id: string, onError: any) : T;
    getAll(): T[];
}