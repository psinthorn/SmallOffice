const mongoose = require("mongoose");
const Contact = require("../models/Contact");
const About = require("../models/About");
const Welcome = require("../models/Welcome");
const Global = require("./../models/GlobalModel");
const ProductCategory = require("./../models/ProductCategory");
const Product = require("../models/Product");
const Intro = require("../models/Intro");
const Service = require("./../models/Service");
const Policy = require("./../models/Policy");

module.exports = {
  dashBoard(req, res) {
    // let promisesAll = [
    //     Product.find({status: 'Public'}).sort({ date: -1}).exec(),
    //     Intro.find({ status: 'Public'}).exec(),
    //     Contact.find({}).exec()
    // ];
    // Promise.all(promisesAll)
    // .then( ([products, intro, contact]) => {
    //         res.render('index/welcome', { products: products, intro: intro, contact });
    // });
  },

  index(req, res) {
    let promisesAll = [
      Global.findOne().exec(),
      Product.find({ status: "Public" })
        .limit(8)
        .sort({ date: -1 })
        .exec(),
      Service.find({ status: "Public" })
        .limit(4)
        .exec(),
      Contact.find({}).exec()
    ];

    Promise.all(promisesAll).then(
      ([globalVars, products, services, contact]) => {
        res.render("index/home", {
          globalVars: globalVars,
          products: products,
          services: services,
          contact: contact,
          websitename: "SmallOffice",
          websitetitle: "SmallOffice - Stable and Flexible is SmallOffice"
        });
      }
    );

    // Welcome.findOne({})
    //     .then( welcome => {
    //         res.render('index/home', { welcome: welcome });
    //     })
  },

  companyProfile(req, res) {
    About.findOne({}).then(about => {
      res.render("index/about", { about: about });
    });
  },

  about(req, res) {
    let promisesAll = [Global.findOne().exec(), About.findOne({})];

    Promise.all(promisesAll).then(([globalVars, about]) => {
      res.render("index/about", { globalVars: globalVars, about: about });
    });
  },

  products(req, res) {
    let promiseAll = [
      Global.findOne().exec(),
      Product.find({ status: "Public" })
        .sort({ date: -1 })
        .exec()
    ];

    Promise.all(promiseAll).then(([globalVars, products]) => {
      res.render("index/products", {
        globalVars: globalVars,
        products: products
      });
    });
  },

  productShow(req, res) {
    const id = req.params.id;

    let promiseAll = [
      Global.findOne().exec(),
      Product.findById({ _id: id })
        .populate("subcontact")
        .exec()
    ];

    Promise.all(promiseAll).then(([globalVars, product]) => {
      res.render("index/product-show", {
        globalVars: globalVars,
        product: product
      });
    });
  },

  services(req, res) {
    let promiseAll = [
      Global.findOne().exec(),
      Service.find({ status: "Public" })
        .sort({ order: 1 })
        .exec()
    ];

    Promise.all(promiseAll).then(([globalVars, services]) => {
      res.render("index/services", {
        globalVars: globalVars,
        services: services
      });
    });
  },

  serviceShow(req, res) {
    const id = req.params.id;

    let promiseAll = [
      Global.findOne().exec(),
      Service.findById({ _id: id }).exec()
    ];

    Promise.all(promiseAll).then(([globalVars, service]) => {
      res.render("index/service-show", {
        globalVars: globalVars,
        service: service
      });
    });
  },

  bookService(req, res) {
    const price = req.query.price;
    const type = req.query.type;
    const id = req.params.id;
    const trFrom = req.query.from;
    const trTo = req.query.to;

    const transfer = {
      from: req.query.from,
      to: req.query.to,
      price: req.query.price,
      type: req.query.type
    };
    //res.send(trDetail);
    res.render("index/book-transfer", { transfer: transfer });
  },

  termPolicy(req, res) {
    let promiseAll = [Global.findOne().exec(), Policy.find({}).exec()];
    Promise.all(promiseAll).then(([globalVars, policy]) => {
      res.render("index/term-policies", {
        globalVars: globalVars,
        policy: policy
      });
    });
  },

  contact(req, res) {
    let promiseAll = [Global.findOne().exec(), Contact.findOne({}).exec()];

    Promise.all(promiseAll).then(([globalVars, contact]) => {
      res.render("index/contact-us", {
        globalVars: globalVars,
        contact: contact
      });
    });
  },

  maps(req, res) {
    res.render("index/maps");
  },

  geocode(req, res) {
    res.render("index/geocode");
  }
};
