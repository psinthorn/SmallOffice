const mongoose = require("mongoose");
const Contact = require("../models/Contact");
const About = require("../models/About");
const Welcome = require("../models/Welcome");
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
      Product.find({ status: "Public" })
        .sort({ date: -1 })
        .exec(),
      Service.find({ status: "Public" }).exec(),
      Contact.find({}).exec()
    ];

    Promise.all(promisesAll).then(([products, services, contact]) => {
      res.render("index/home", {
        products: products,
        services: services,
        contact: contact
      });
    });

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
    About.findOne({}).then(about => {
      res.render("index/about", { about: about });
    });
  },

  products(req, res) {
    Product.find({ status: "Public" })
      .sort({ date: -1 })
      .then(products => {
        res.render("index/products", { products: products });
      });
  },

  productShow(req, res) {
    const id = req.params.id;

    Product.findById({ _id: id })
      .populate("subcontact")
      .then(product => {
        res.render("index/product-show", { product: product });
      });
  },

  services(req, res) {
    Service.find({ status: "Public" })
      .sort({ order: 1 })
      .then(services => {
        res.render("index/services", { services: services });
      });
  },

  serviceShow(req, res) {
    const id = req.params.id;

    Service.findById({ _id: id }).then(service => {
      res.render("index/service-show", { service: service });
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
    Policy.find({}).then(policy => {
      res.render("index/term-policies", { policy: policy });
    });
  },

  contact(req, res) {
    Contact.findOne({}).then(contact => {
      res.render("index/contact-us", { contact: contact });
    });
  },

  maps(req, res) {
    res.render("index/maps");
  },

  geocode(req, res) {
    res.render("index/geocode");
  }
};
