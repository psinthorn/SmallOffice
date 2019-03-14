const CategoryController = require("../controllers/admin/categoryController");
const { ensureAuthenticated, ensureGuest } = require("../helpers/auth");

module.exports = app => {
  //888888888888888888888888888
  //88 Category
  //888888888888888888888888888

  app.get("/admin/category", CategoryController.getAll);

  app.get("/admin/category/add", CategoryController.addForm);

  app.post("/admin/category", CategoryController.create);

  app.get("/admin/category/edit/:id", CategoryController.editForm);

  app.put("/admin/category/:id", CategoryController.editUpdate);

  app.put("/admin/category/image/:id", CategoryController.imageUpdate);

  app.delete("/admin/category/:id", CategoryController.delete);

  //888888888888888888888888888
  //88   Main Category
  //888888888888888888888888888

  app.get("/admin/category/main", CategoryController.getAllMain);

  app.get("/admin/category/main/add", CategoryController.addFormMain);

  app.get("/admin/category/main/edit/:id", CategoryController.editFormMain);

  app.post("/admin/category/main", CategoryController.createMain);

  app.put("/admin/category/main/:id", CategoryController.editUpdateMain);

  app.put("/admin/category/main/image/:id", CategoryController.imageUpdate);

  app.delete("/admin/category/main/:id", CategoryController.deleteMain);

  //8888888888888888888888888888
  //88   Sub Product Category 88
  //8888888888888888888888888888

  app.get("/admin/category/sub", CategoryController.getAllSub);

  app.get("/admin/category/sub/add", CategoryController.addFormSub);

  app.get("/admin/category/sub/edit/:id", CategoryController.editFormSub);

  app.post("/admin/category/sub", CategoryController.createSub);

  app.put("/admin/category/sub/:id", CategoryController.editUpdateSub);

  app.put("/admin/category/sub/image/:id", CategoryController.imageUpdate);

  app.delete("/admin/category/sub/:id", CategoryController.deleteSub);
};
