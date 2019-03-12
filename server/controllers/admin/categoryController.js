const mongoose = require("mongoose");
const fs = require("fs");
const Category = require("./../../models/Category");

module.exports = {
  //Get all available list of apartments
  getAll(req, res) {
    Category.find({})
      .sort({ date: -1 })
      .then(categories => {
        res.render("admin/category", {
          categories: categories,
          sectionTitle: "หมวดหมู่รายการปัจจุบัน"
        });
      })
      .catch(err => {
        res.send(err);
      });
  },

  //Create form
  addForm(req, res) {
    Category.find({}).then(categories => {
      res.render("admin/category-add", {
        categories: categories,
        sectionTitle: "เพิ่มหมวดหมู่"
      });
    });
  },

  //Create new tour
  create(req, res) {
    // const imgUrl = req.files.imgUrl;
    // const imgUrlName = Date.now() + "-" + imgUrl.name;
    // const imagesUploads = "./public/images/category/main";
    // imgUrl.mv(imagesUploads + imgUrlName, err => {
    //   if (err) throw err;
    // });

    const categoryProps = new Category({
      title: req.body.title,
      desc: req.body.desc,
      categorymain: req.body.categorymain,
      categorysub: req.body.categorysub,
      // imgUrl: imgUrlName,
      status: req.body.status
      //user: req.user.id
    });

    //res.send(categoryProps);

    Category.create(categoryProps)
      .then(() => Category.find({}).sort({ date: -1 }))
      .then(categories => {
        let success_msg = "Category added";
        res.redirect("/admin/category");
      });
  },

  //Edit form apartment
  editForm(req, res) {
    const id = req.params.id;
    //console.log(id);
    Category.findById({ _id: id }).then(category => {
      res.render("admin/category-edit", {
        category: category,
        sectionTitle: "แก้ไขหมวดหมู่"
      });
    });
  },

  //Edit form tour category
  editUpdate(req, res) {
    const id = req.params.id;
    const categoryProps = req.body;

    Category.findByIdAndUpdate({ _id: id }, categoryProps).then(category => {
      //res.redirect(`/admin/category/edit/${category.id}`);
      res.redirect("/admin/category");
    });
  },

  //Image Update

  imageUpdate(req, res) {
    const id = req.params.id;
    const oldImgUrl = req.body.oldImgUrl;
    const imgUrl = req.files.imgUrl;

    const imgUrlName = Date.now() + "-" + imgUrl.name;
    const imagesUploads = "./public/images/category";
    imgUrl.mv(imagesUploads + imgUrlName, err => {
      if (err) throw err;
    });

    const newImg = {
      imgUrl: imgUrlName
    };

    fs.unlink(imagesUploads + oldImgUrl, err => {
      Category.findByIdAndUpdate({ _id: id }, newImg)
        .then(() => Category.findById({ _id: id }))
        .then(category => {
          res.redirect(`/admin/category/edit/${category.id}`);
        });
    });
  },

  //Delete tour
  delete(req, res) {
    const id = req.params.id;

    Category.findByIdAndRemove({ _id: id })
      .then(() => Category.find({}))
      .then(categories => {
        // res.render("admin/category-main", { categories: categories });
        res.redirect("/admin/category");
      });
  },

  //Get all sub category
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
