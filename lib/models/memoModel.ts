import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const MemoSchema = new Schema({
  sourceWord: {
    type: String,
    required: 'Source word must be set',
  },
  translatedWord: {
    type: String,
    required: 'Translated word must be set',
  },
});