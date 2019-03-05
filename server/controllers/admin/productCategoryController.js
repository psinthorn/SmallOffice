const mongoose = require("mongoose");
const CategoryMain = require("../../models/CategoryMain");
const CategorySub = require("../../models/CategorySub");
const fs = require("fs");

module.exports = {
  //Get all available list of apartments
  getAll(req, res) {
    CategoryMain.find({})
      .sort({ date: -1 })
      .then(categories => {
        res.render("admin/category-main", { categories: categories });
      })
      .catch(err => {
        res.send(err);
      });
  },

  //Create form
  addForm(req, res) {
    CategoryMain.find({}).then(categories => {
      res.render("admin/category-main-add", { categories: categories });
    });
  },

  //Create new tour
  create(req, res) {
    const imgUrl = req.files.imgUrl;
    const imgUrlName = Date.now() + "-" + imgUrl.name;
    const imagesUploads = "./public/images/category/main";
    imgUrl.mv(imagesUploads + imgUrlName, err => {
      if (err) throw err;
    });

    const categoryProps = new CategoryMain({
      title: req.body.title,
      desc: req.body.desc,
      imgUrl: imgUrlName,
      status: req.body.status,
      user: req.user.id
    });

    //res.send(categoryProps);

    CategoryMain.create(categoryProps)
      .then(() => CategoryMain.find({}).sort({ date: -1 }))
      .then(categories => {
        let success_msg = "Main Category added";
        res.render("admin/category-main", {
          categories: categories,
          success_msg: success_msg
        });
      });
  },

  //Edit form apartment
  editForm(req, res) {
    const id = req.params.id;
    //console.log(id);
    Category.findById({ _id: id }).then(category => {
      res.render("admin/category-main-edit", { category: category });
    });
  },

  //Edit form tour category
  editUpdate(req, res) {
    const id = req.params.id;
    const categoryProps = req.body;

    CategoryMain.findByIdAndUpdate({ _id: id }, categoryProps).then(
      category => {
        res.redirect(`/admin/category/main/edit/${category.id}`);
      }
    );
  },

  //Image Update

  imageUpdate(req, res) {
    const id = req.params.id;
    const oldImgUrl = req.body.oldImgUrl;
    const imgUrl = req.files.imgUrl;

    const imgUrlName = Date.now() + "-" + imgUrl.name;
    const imagesUploads = "./public/images/category/main";
    imgUrl.mv(imagesUploads + imgUrlName, err => {
      if (err) throw err;
    });

    const newImg = {
      imgUrl: imgUrlName
    };

    fs.unlink(imagesUploads + oldImgUrl, err => {
      CategoryMain.findByIdAndUpdate({ _id: id }, newImg)
        .then(() => CategoryMain.findById({ _id: id }))
        .then(category => {
          res.redirect(`/admin/category/main/edit/${category.id}`);
        });
    });
  },

  //Delete tour
  delete(req, res) {
    const id = req.params.id;

    CategoryMain.findByIdAndRemove({ _id: id })
      .then(() => CategoryMain.find({}))
      .then(categories => {
        res.render("admin/category-main", { categories: categories });
      });
  },

  //Get all available list of apartments
  getAllSub(req, res) {
    CategorySub.find({})
      .sort({ date: -1 })
      .then(categories => {
        res.render("admin/category-sub", { categories: categories });
      })
      .catch(err => {
        res.send(err);
      });
  }
};
