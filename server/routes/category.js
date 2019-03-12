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
  //88   Mian Product Category
  //888888888888888888888888888

  app.get("/admin/category/main", CategoryController.getAll);

  app.get("/admin/category/main/add", CategoryController.addForm);

  app.get("/admin/product/category/main/edit/:id", CategoryController.editForm);

  app.post("/admin/category/main", CategoryController.create);

  app.put("/admin/product/category/main/:id", CategoryController.editUpdate);

  app.put(
    "/admin/product/category/main/image/:id",
    CategoryController.imageUpdate
  );

  app.delete(
    "/admin/category/main/:id",
    ensureAuthenticated,
    CategoryController.delete
  );

  //8888888888888888888888888888
  //88   Sub Product Category 88
  //8888888888888888888888888888

  app.get(
    "/admin/category/sub",

    CategoryController.getAllSub
  );

  app.get(
    "/admin/product/category/sub/add",

    CategoryController.addForm
  );

  app.get(
    "/admin/product/category/sub/edit/:id",

    CategoryController.editForm
  );

  app.post(
    "/admin/product/category/sub",

    CategoryController.create
  );

  app.put(
    "/admin/product/category/sub/:id",

    CategoryController.editUpdate
  );

  app.put(
    "/admin/product/category/sub/image/:id",

    CategoryController.imageUpdate
  );

  app.delete(
    "/admin/product/category/sub/:id",

    CategoryController.delete
  );
};
