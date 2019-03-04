const ProductCategoryController = require("./../controllers/admin/productCategoryController");
const { ensureAuthenticated, ensureGuest } = require("./../helpers/auth");

module.exports = app => {
  //888888888888888888888888888
  //88   Tour Category 88
  //888888888888888888888888888

  app.get(
    "/admin/product-category",
    ensureAuthenticated,
    ProductCategoryController.getAll
  );

  app.get(
    "/admin/product-category/add",
    ensureAuthenticated,
    ProductCategoryController.addForm
  );

  app.get(
    "/admin/product-category/edit/:id",
    ensureAuthenticated,
    ProductCategoryController.editForm
  );

  app.post(
    "/admin/product-category",
    ensureAuthenticated,
    ProductCategoryController.create
  );

  app.put(
    "/admin/product-category/:id",
    ensureAuthenticated,
    ProductCategoryController.editUpdate
  );

  app.put(
    "/admin/product-category/image/:id",
    ensureAuthenticated,
    ProductCategoryController.imageUpdate
  );

  app.delete(
    "/admin/product-category/:id",
    ensureAuthenticated,
    ProductCategoryController.delete
  );
};
