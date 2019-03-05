const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySubSchema = new Schema({
  categorymain: {
    type: Schema.Types.ObjectId,
    ref: "categorymain"
  },

  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    default: "Category Desc"
  },
  imgUrl: {
    type: String,
    default: "default"
  },
  status: {
    type: String,
    default: "public"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const CategorySub = mongoose.model(
  "categorysub",
  CategorySubSchema,
  "categorysubs"
);
module.exports = CategorySub;
