const mongoose = require("mongoose");
const fs = require("fs");
const Category = require("./../../models/Category");
const CategoryMain = require("./../../models/CategoryMain");
const CategorySub = require("./../../models/CategorySub");

module.exports = {
  //
  // Section: Category
  //

  //Get all available list of Category
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

  //Create new category
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

  //Edit form  category
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

  //Delete category
  delete(req, res) {
    const id = req.params.id;

    Category.findByIdAndRemove({ _id: id })
      .then(() => Category.find({}))
      .then(categories => {
        // res.render("admin/category-main", { categories: categories });
        res.redirect("/admin/category");
      });
  },

  //
  // Section: Main Category
  //

  //Get all available list of Category
  getAllMain(req, res) {
    CategoryMain.find({})
      .sort({ date: -1 })
      .then(categories => {
        res.render("admin/category-main", {
          categories: categories,
          sectionTitle: "หมวดหมู่หลักปัจจุบัน"
        });
      })
      .catch(err => {
        res.send(err);
      });
  },

  //Create form
  addFormMain(req, res) {
    CategoryMain.find({}).then(categories => {
      res.render("admin/category-main-add", {
        categories: categories,
        sectionTitle: "เพิ่มหมวดหมู่หลัก"
      });
    });
  },

  //Create new category
  createMain(req, res) {
    // const imgUrl = req.files.imgUrl;
    // const imgUrlName = Date.now() + "-" + imgUrl.name;
    // const imagesUploads = "./public/images/category/main";
    // imgUrl.mv(imagesUploads + imgUrlName, err => {
    //   if (err) throw err;
    // });

    const categoryProps = new Category({
      title: req.body.title,
      desc: req.body.desc,
      // imgUrl: imgUrlName,
      status: req.body.status
      //user: req.user.id
    });

    //res.send(categoryProps);

    CategoryMain.create(categoryProps)
      .then(() => CategoryMain.find({}).sort({ date: -1 }))
      .then(categories => {
        let success_msg = "Category added";
        res.redirect("/admin/category/main");
      });
  },

  //Edit form  category
  editFormMain(req, res) {
    const id = req.params.id;
    //console.log(id);
    CategoryMain.findById({ _id: id }).then(category => {
      res.render("admin/category-main-edit", {
        category: category,
        sectionTitle: "แก้ไขหมวดหมู่"
      });
    });
  },

  //Edit form tour category
  editUpdateMain(req, res) {
    const id = req.params.id;
    const categoryProps = req.body;

    CategoryMain.findByIdAndUpdate({ _id: id }, categoryProps).then(
      category => {
        //res.redirect(`/admin/category/edit/${category.id}`);
        res.redirect("/admin/category/main");
      }
    );
  },

  //Image Update

  imageUpdateMain(req, res) {
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
      CategoryMain.findByIdAndUpdate({ _id: id }, newImg)
        .then(() => CategoryMain.findById({ _id: id }))
        .then(category => {
          res.redirect(`/admin/category/main/edit/${category.id}`);
        });
    });
  },

  //Delete category
  deleteMain(req, res) {
    const id = req.params.id;

    CategoryMain.findByIdAndRemove({ _id: id })
      .then(() => CategoryMain.find({}))
      .then(categories => {
        // res.render("admin/category-main", { categories: categories });
        res.redirect("/admin/category/main");
      });
  },

  //
  // Section: Sub Category
  //

  //Get all available list of Category
  getAllSub(req, res) {
    CategorySub.find({})
      .sort({ date: -1 })
      .then(categories => {
        res.render("admin/category-sub", {
          categories: categories,
          sectionTitle: "หมวดหมู่รอง"
        });
      })
      .catch(err => {
        res.send(err);
      });
  },

  //Create form
  addFormSub(req, res) {
    CategorySub.find({}).then(categories => {
      res.render("admin/category-sub-add", {
        categories: categories,
        sectionTitle: "เพิ่มหมวดหมู่รอง"
      });
    });
  },

  //Create new category
  createSub(req, res) {
    // const imgUrl = req.files.imgUrl;
    // const imgUrlName = Date.now() + "-" + imgUrl.name;
    // const imagesUploads = "./public/images/category/main";
    // imgUrl.mv(imagesUploads + imgUrlName, err => {
    //   if (err) throw err;
    // });

    const categoryProps = new Category({
      title: req.body.title,
      desc: req.body.desc,
      // imgUrl: imgUrlName,
      status: req.body.status
      //user: req.user.id
    });

    //res.send(categoryProps);

    CategorySub.create(categoryProps)
      .then(() => CategorySub.find({}).sort({ date: -1 }))
      .then(categories => {
        let success_msg = "Category added";
        res.redirect("/admin/category/sub");
      });
  },

  //Edit form  category
  editFormSub(req, res) {
    const id = req.params.id;
    //console.log(id);
    CategorySub.findById({ _id: id }).then(category => {
      res.render("admin/category-sub-edit", {
        category: category,
        sectionTitle: "แก้ไขหมวดหมู่รอง"
      });
    });
  },

  //Edit form tour category
  editUpdateSub(req, res) {
    const id = req.params.id;
    const categoryProps = req.body;

    CategorySub.findByIdAndUpdate({ _id: id }, categoryProps).then(category => {
      //res.redirect(`/admin/category/edit/${category.id}`);
      res.redirect("/admin/category/sub");
    });
  },

  //Image Update

  imageUpdateSub(req, res) {
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
      CategorySub.findByIdAndUpdate({ _id: id }, newImg)
        .then(() => CategorySub.findById({ _id: id }))
        .then(category => {
          res.redirect(`/admin/category/sub/edit/${category.id}`);
        });
    });
  },

  //Delete category
  deleteSub(req, res) {
    const id = req.params.id;

    CategorySub.findByIdAndRemove({ _id: id })
      .then(() => CategorySub.find({}))
      .then(categories => {
        // res.render("admin/category-main", { categories: categories });
        res.redirect("/admin/category/sub");
      });
  }
};
