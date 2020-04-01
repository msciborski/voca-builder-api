import { IWriter } from "./IWriter";
import { IReader } from "./IReader";

export interface IRepository<T> extends IWriter<T>, IReader<T> {
    delete(entity: T): boolean;
    update(entity: T) : T;
}