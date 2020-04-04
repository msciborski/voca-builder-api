import { IWriter } from "./IWriter";
import { IReader } from "./IReader";

export interface IRepository<T> extends IWriter<T>, IReader<T> {
    delete(id: string): Promise<void>;
    update(entity: T) : Promise<T>;
}