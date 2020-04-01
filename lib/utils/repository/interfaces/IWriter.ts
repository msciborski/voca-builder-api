export interface IWriter<T> {
    add(entity: T) : boolean;
}