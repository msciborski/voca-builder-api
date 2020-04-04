export interface IReader<T> {
    getById(id: string) : Promise<T>;
    getAll(): Promise<T[]>;
}