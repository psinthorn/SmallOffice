const mongoose = require("mongoose");
const Schedma = mongoose.Schema;

const GlobalSchema = new Schema({
  logo: {
    type: String
  },
  name: [
    {
      wordone: {
        type: String
      },
      wordtwo: {
        type: String
      }
    }
  ],
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
    title: {
      type: String
    }
  },
  shortdesc: {
    desc: {
      String
    }
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
  ]
});
const Global = mongoose.model("global", GlobalSchema, "globals");
module.exports = Global;
