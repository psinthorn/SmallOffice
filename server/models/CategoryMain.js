const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoryMainSchema = new Schema({
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

const CategoryMain = mongoose.model(
  "categorymain",
  CategoryMainSchema,
  "categorymains"
);
module.exports = CategoryMain;
