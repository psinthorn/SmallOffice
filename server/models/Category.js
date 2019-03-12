const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategoryMainSchema = require("./CategoryMainSchema");
const CategorySubSchema = require("./CategorySubSchema");

const CategorySchema = new Schema({
  title: {
    type: String
  },
  desc: {
    type: String
  },
  // categorymain: {
  //   type: Schema.Types.ObjectId,
  //   ref: "categorymain"
  // },
  // categorysub: {
  //   type: Schema.Types.ObjectId,
  //   ref: "categorysub"
  // },
  categorymain: {
    type: String
  },
  categorysub: {
    type: String
  },
  status: {
    type: String
  }
});

const Category = mongoose.model("category", CategorySchema, "categories");
module.exports = Category;
