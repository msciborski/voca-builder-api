import * as mongoose from "mongoose";
import { MemoSchema } from "./memoModel";

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  _id: String,
  memos: [MemoSchema],
});