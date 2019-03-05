const mongoose = require("mongoose");
const Product = require("../../models/Product");
const fs = require("fs");

module.exports = {
  //Get all available list of apartments
  getAll(req, res) {
    Product.find({})
      .sort({ date: 1 })
      .then(products => {
        res.render("admin/products-list", { products: products });
        //res.send(products);
      });
  },

  //Create form

  addForm(req, res) {
    Product.find({}).then(products => {
      res.render("admin/product-add", { products: products });
    });
  },

  //Create new product
  create(req, res) {
    const imgUrl = req.files.imgUrl;
    const imgUrlName = Date.now() + "-" + imgUrl.name;
    const imagesUploads = "./public/images/product/";
    imgUrl.mv(imagesUploads + imgUrlName, err => {
      if (err) throw err;
    });

    const productProps = new Product({
      title: req.body.title,
      desc: req.body.desc,
      imgUrl: imgUrlName,
      address: req.body.address,
      status: req.body.status,
      user: req.user.id
    });

    Product.create(productProps)
      .then(() => Product.find({}).sort({ date: -1 }))
      .then(products => {
        res.render("admin/products-list", { products: products });
      });
  },

  //Edit form apartment
  editForm(req, res) {
    const id = req.params.id;
    //console.log(id);
    Product.findById({ _id: id })
      .populate("subcontact")
      .then(product => {
        res.render("admin/product-edit", { product: product });
      });
  },

  //Edit form product
  editUpdate(req, res) {
    const productProps = req.body;
    const id = req.params.id;

    Product.findByIdAndUpdate({ _id: id }, productProps)
      .then(() => Product.find({}).sort({ date: -1 }))
      .then(products => {
        res.render("admin/products-list", { products: products });
      });
  },

  //Delete product
  delete(req, res) {
    const id = req.params.id;

    Product.findByIdAndRemove({ _id: id })
      .then(() => Product.find({}).sort({ date: -1 }))
      .then(products => {
        res.render("admin/products-list", { products: products });
      });
  },

  //upload Thumbnail image form
  image(req, res) {
    res.render("admin/image-upload-form");
  },
  //image Thumbnail upload process
  imageUplaod(req, res) {
    const id = req.params.id;

    const imgUrl = req.files.imgUrl;
    const imgUrlName = Date.now() + "-" + imgUrl.name;
    const imagesUploads = "./public/images/product/";
    imgUrl.mv(imagesUploads + imgUrlName, err => {
      if (err) throw err;
    });

    Product.findById({ _id: id }).then(apartment => {
      apartment.imgUrl.push(imag);
    });
  },

  //Image Thumbnail Update

  imageUpdate(req, res) {
    const id = req.params.id;
    const oldImgUrl = req.body.oldImgUrl;
    const imgUrl = req.files.imgUrl;
    //console.log(oldImgUrl);
    //res.send(imgUrl.name);

    const imgUrlName = Date.now() + "-" + imgUrl.name;
    const imagesUploads = "./public/images/product/";
    imgUrl.mv(imagesUploads + imgUrlName, err => {
      if (err) throw err;
    });

    const newImg = {
      imgUrl: imgUrlName
    };

    fs.unlink(imagesUploads + oldImgUrl, err => {
      Product.findByIdAndUpdate({ _id: id }, newImg)
        .then(() => Product.findById({ _id: id }))
        .then(product => {
          res.render("admin/product-edit", { product: product });
        });
    });
  },

  //Product Banner Controller
  //Banner upload image banner form
  banner(req, res) {
    res.render("admin/image-banner-upload-form");
  },
  //Banner image upload process
  imageBannerUplaod(req, res) {
    const id = req.params.id;

    const imgUrl = req.files.productBannerImgUrl;
    const imgUrlName = Date.now() + "-" + imgUrl.name;
    const imagesUploads = "./public/images/product/banner/";
    imgUrl.mv(imagesUploads + imgUrlName, err => {
      if (err) throw err;
    });

    Product.findById({ _id: id }).then(product => {
      product.productBannerImgUrl.push(imag);
    });
  },

  //Banner Image Update
  imageBannerUpdate(req, res) {
    const id = req.params.id;
    const oldImgUrl = req.body.oldImgUrl;
    const imgUrl = req.files.productBannerImgUrl;
    //console.log(oldImgUrl);
    //res.send(imgUrl.name);

    const imgUrlName = Date.now() + "-" + imgUrl.name;
    const imagesUploads = "./public/images/product/banner/";
    imgUrl.mv(imagesUploads + imgUrlName, err => {
      if (err) throw err;
    });

    const newImg = {
      productBannerImgUrl: imgUrlName
    };

    fs.unlink(imagesUploads + oldImgUrl, err => {
      Product.findByIdAndUpdate({ _id: id }, newImg)
        .then(() => Product.findById({ _id: id }))
        .then(product => {
          res.render("admin/product-edit", { product: product });
        });
    });
  },

  //Contact each apartment
  contactAdd(req, res) {
    const id = req.params.id;
    const newContact = new SubContact({
      title: req.body.title,
      email: req.body.email,
      person: req.body.person
    });

    const product = Product.findById({ _id: id }).then(product => {
      Product.subcontact.push(newContact);
      Promise.all([newContact.save(), Product.save()])
        .then(() => Product.findById({ _id: id }))
        //.populate('subcontact')
        .then(product => {
          res.render("admin/product-edit", { product: product });
          //res.send(apartment);
        });
    });
  },

  //Contact Edit Form
  contactEditForm(req, res) {
    const id = req.params.id;
    // const newContact = req.body;

    Product.findOne({ "subcontact._id": id }).then(product => {
      res.render("admin/product-edit-contact", { product: product });
    });
  },

  //Location Edit Form
  locationEditForm() {},

  //Add location
  locationAdd(req, res) {
    const id = req.params.id;
    const newLocation = req.body;

    Product.findById({ _id: id })
      .then(product => {
        Product.locations.push(newLocation);
        return Product.save();
      })
      .then(() => Product.findById({ _id: id }))
      .then(product => {
        res.render("admin/product-edit", { product: product });
      });
  },

  //Update location
  locationUpdate(req, res) {
    const id = req.params.id;
    const newLocation = req.body;

    Product.findByIdAndUpdate({ "locations._id": id }).then(product => {
      res.send(product);
      //res.render('admin/apartment-edit', { apartment: apartment });
    });
  },

  //Delete Location
  locationDelete(req, res) {
    const id = req.params.id;

    Product.findOne({ "locations._id": id })
      //.populate('facilities')
      .then(product => {
        product.locations.pull({ _id: id });
        product.save().then(product => {
          res.render("admin/product-edit", { product: product });
        });
      });
  },

  //Include Function start

  //Add include form
  include(req, res) {
    const id = req.params.id;
    Product.findById({ _id: id }).then(product => {
      const newInclude = {
        title: req.body.title,
        value: req.body.value
      };
      product.included.push(newInclude);
      product.save().then(product => {
        res.render("admin/product-edit", { product: product });
      });
    });
  },

  //Delete Included
  includeDelete(req, res) {
    const id = req.params.id;
    Product.findOne({ "included._id": id }).then(include => {
      include.included.pull({ _id: id });
      include.save().then(product => {
        res.render("admin/product-edit", { product: product });
      });
    });
  },

  //Exclude Function start

  //Add Exclude form
  exclude(req, res) {
    const id = req.params.id;
    Product.findById({ _id: id }).then(product => {
      const newExclude = {
        title: req.body.title,
        value: req.body.value
      };
      product.excluded.push(newExclude);
      product.save().then(product => {
        res.render("admin/product-edit", { product: product });
      });
    });
  },

  //Delete Excluded
  excludeDelete(req, res) {
    const id = req.params.id;
    Product.findOne({ "excluded._id": id }).then(exclude => {
      exclude.excluded.pull({ _id: id });
      exclude.save().then(product => {
        res.render("admin/product-edit", { product: product });
      });
    });
  }
};
