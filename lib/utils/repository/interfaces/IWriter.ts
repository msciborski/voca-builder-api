export interface IWriter<T> {
    add(entity: T) : Promise<T>;
}