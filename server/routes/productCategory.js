const ProductCategoryController = require("./../controllers/admin/productCategoryController");
const { ensureAuthenticated, ensureGuest } = require("./../helpers/auth");

module.exports = app => {
  //888888888888888888888888888
  //88   Mian Product Category
  //888888888888888888888888888

  app.get("/admin/category/main", ProductCategoryController.getAll);

  app.get(
    "/admin/product/category/main/add",
    ProductCategoryController.addForm
  );

  app.get(
    "/admin/product/category/main/edit/:id",
    ProductCategoryController.editForm
  );

  app.post("/admin/product/category/main", ProductCategoryController.create);

  app.put(
    "/admin/product/category/main/:id",
    ProductCategoryController.editUpdate
  );

  app.put(
    "/admin/product/category/main/image/:id",
    ProductCategoryController.imageUpdate
  );

  app.delete(
    "/admin/product/category/main/:id",
    ensureAuthenticated,
    ProductCategoryController.delete
  );

  //8888888888888888888888888888
  //88   Sub Product Category 88
  //8888888888888888888888888888

  app.get(
    "/admin/category/sub",

    ProductCategoryController.getAllSub
  );

  app.get(
    "/admin/product/category/sub/add",

    ProductCategoryController.addForm
  );

  app.get(
    "/admin/product/category/sub/edit/:id",

    ProductCategoryController.editForm
  );

  app.post(
    "/admin/product/category/sub",

    ProductCategoryController.create
  );

  app.put(
    "/admin/product/category/sub/:id",

    ProductCategoryController.editUpdate
  );

  app.put(
    "/admin/product/category/sub/image/:id",

    ProductCategoryController.imageUpdate
  );

  app.delete(
    "/admin/product/category/sub/:id",

    ProductCategoryController.delete
  );
};
