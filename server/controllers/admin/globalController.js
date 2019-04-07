const mongoose = require("mongoose");
const fs = require("fs");
const Global = require("./../../models/GlobalModel");

//
// Global settings is data that frenquency use around website
//
// Title, Keywords, Describtions
// logo
// footer
// social network
// Admin, support contact
//

module.exports = {
  getAll(req, res) {
    Global.findOne({}).then(global => {
      console.log(global);
      res.render("admin/global/global", { global: global });
    });
  },

  // Global form
  addForm(req, res) {
    res.render("admin/global/global-add");
  },

  // Create new global setting
  create(req, res) {
    const globalData = req.body;
    //console.log(globalData);
    const newGlobal = {};

    newGlobal.logo = req.body.logo;
    newGlobal.slogan = req.body.slogan;
    newGlobal.desc = req.body.desc;

    newGlobal.name = {};
    newGlobal.name.wordone = req.body.wordone;
    newGlobal.name.wordtwo = req.body.wordtwo;

    console.log(newGlobal);

    Global.create(newGlobal).then(global => {
      res.send(global);
    });
  },

  // Edit Form
  editForm(req, res) {
    const id = req.params.id;
    console.log(id);
    res.send({ greeting: "Hello Edit Form" });
  },

  //upload Thumbnail image form
  imageLogo(req, res) {
    res.render("admin/logo-upload-form");
  },
  //image Thumbnail upload process
  imageLogoUplaod(req, res) {
    const id = req.params.id;

    const imgUrl = req.files.imgUrl;
    const imgUrlName = Date.now() + "-logo-" + imgUrl.name;
    const imagesUploads = "./public/images/";
    imgUrl.mv(imagesUploads + imgUrlName, err => {
      if (err) throw err;
    });

    Global.findById({
      _id: id
    }).then(apartment => {
      apartment.imgUrl.push(imag);
    });
  },

  //Image Thumbnail Update

  imageLogoUpdate(req, res) {
    const id = req.params.id;
    const oldImgUrl = req.body.oldImgUrl;
    const imgUrl = req.files.imgUrl;
    //console.log(oldImgUrl);
    //res.send(imgUrl.name);

    const imgUrlName = Date.now() + "-" + imgUrl.name;
    const imagesUploads = "./public/images/";
    imgUrl.mv(imagesUploads + imgUrlName, err => {
      if (err) throw err;
    });

    const newImg = {
      imgUrl: imgUrlName
    };

    fs.unlink(imagesUploads + oldImgUrl, err => {
      Global.findByIdAndUpdate(
        {
          _id: id
        },
        newImg
      )
        .then(() =>
          Global.findById({
            _id: id
          })
        )
        .then(global => {
          res.render("admin/global-config-edit", {
            global: global
          });
        });
    });
  }
};
