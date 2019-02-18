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
  destinationLanguage: {
    type: String,
    default: 'en',
    required: 'Destination language is required',
  },
  isLearned: {
    type: Boolean,
    default: false,
  },
});