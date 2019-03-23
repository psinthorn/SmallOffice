const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LocationSchema = require("./../models/LocationSchema");
const GallerySchema = require("./../models/GallerySchema");

const ProductSchema = new Schema({
  order: {
    no: String
  },
  name: {
    type: String
  },

  title: {
    type: String
  },
  desc: {
    type: String
  },
  category: {
    type: String
    // type: Schema.Types.ObjectId,
    // ref: "category"
  },
  imgUrl: {
    type: String,
    default: "thumbnail640x480.png"
  },
  productBannerImgUrl: {
    type: String,
    default: "banner-temp1024x300.jpg"
  },

  gallery: [GallerySchema],
  locations: [LocationSchema],
  address: {
    type: String
  },

  included: [
    {
      title: {
        type: String
      },
      value: {
        type: String
      }
    }
  ],

  excluded: [
    {
      title: {
        type: String
      },
      value: {}
    }
  ],
  price: {
    sale: {
      type: String,
      trim: true,
      default: 0.0
    },
    net: {
      type: String,
      trim: true,
      default: 0.0
    },
    status: {
      type: String,
      default: "Unavailable"
    }
  },
  tags: [
    {
      keywords: {
        type: String
      }
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: "public"
  }
});

// ProductSchema.virtual('apartmentCount').get(function() {
//     return this.title.length;
// });

const Product = mongoose.model("product", ProductSchema, "products");
module.exports = Product;
