const mongoose = require("mongoose");

const ToolSchema = new mongoose.Schema({
  type: String,
  title: String,
  subTitle: String,
  tkanon: {
    title: String,
    tkanonNumber: String,
    tkanonDetails: [{ sectionTitle: String, sectionContent: String }],
  },
  language: String,
  redirectTo: String,
});

const Tool = mongoose.model("Tool", ToolSchema);
module.exports = Tool;
