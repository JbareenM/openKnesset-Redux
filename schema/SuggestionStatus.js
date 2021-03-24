const mongoose = require("mongoose");
const User = require("./user").schema;

const SuggestionStatusSchema = new mongoose.Schema({
  updatedBy: User,
  status: String,
  date: { type: Date, default: Date.now },
});
const SuggestionStatus = mongoose.model(
  "SuggestionStatus",
  SuggestionStatusSchema
);
module.exports = SuggestionStatus;
