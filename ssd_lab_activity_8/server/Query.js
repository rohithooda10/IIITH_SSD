const mongoose = require("mongoose");

const QuerySchema = new mongoose.Schema({
  exam_name: String,
  course_name: String,
  question_num: Number,
  ta_roll: String,
  std_roll: String,
  ta_comment: String,
  std_comment: String,
  IsActive: Boolean,
});

const QueryModel = new mongoose.model("queries", QuerySchema);

module.exports = QueryModel;
