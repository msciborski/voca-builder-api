import * as mongoose from "mongoose";
import { MemoSchema } from "./memoModel";

const Schema = mongoose.Schema;


export const UserSchema = new Schema({
  _id: String,
  destinationLanguage: {
    type: String,
    default: 'en',
    required: 'Destination language is required',
  },
  sourceLanguage: {
    type: String,
    default: 'pl',
    required: 'Source language is required',
  },
  memos: [MemoSchema],
});