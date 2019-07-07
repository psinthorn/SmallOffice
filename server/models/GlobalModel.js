const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GlobalSchema = new Schema({
  imgUrl: {
    type: String
  },
  name: {
    wordone: {
      type: String
    },
    wordtwo: {
      type: String
    }
  },
  //   welcomemsg: {
  //     header: {
  //       type: String
  //     },
  //     body: {
  //       type: String
  //     },
  //     footermain: {
  //       type: {
  //         type: String
  //       },
  //       footersub: {
  //         type: String
  //       }
  //     }
  //   },
  slogan: {
    type: String
  },
  desc: {
    type: String
  },
  url: {
    type: String
  },
  socials: [
    {
      title: {
        type: String
      },
      url: {
        type: String
      },
      logo: {
        type: String
      }
    }
  ],
  status: {
    type: String
  }
});
const Global = mongoose.model("global", GlobalSchema, "globals");
module.exports = Global;
