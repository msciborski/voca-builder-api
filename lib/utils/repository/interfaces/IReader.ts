export interface IReader<T> {
    getById(id: string, onError: any) : Promise<T>;
    getAll(): Promise<T[]>;
}