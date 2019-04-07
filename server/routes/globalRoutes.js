const GlobalController = require("../controllers/admin/globalController");
const { ensureAuthenticated, ensureGuest } = require("../helpers/auth");

module.exports = app => {
  //888888888888888888888888888
  //88   global Routes    88
  //888888888888888888888888888

  //Get all global List
  app.get("/admin/global", GlobalController.getAll);

  //Get all tour List
  app.get("/admin/global/add", GlobalController.addForm);

  //Create new global
  app.post("/admin/global", GlobalController.create);

  //Edit form
  app.get("/admin/global/:id", GlobalController.editForm);

  // //Edit process
  // app.put(
  //   "/admin/global/:id",
  //   ensureAuthenticated,
  //   GlobalController.editUpdate
  // );

  // //Delete global
  // app.delete("/admin/global/:id", ensureAuthenticated, GlobalController.delete);

  // //Included
  // app.post(
  //   "/admin/global/include/:id",
  //   ensureAuthenticated,
  //   GlobalController.include
  // );
  // app.delete(
  //   "/admin/global/include/:id",
  //   ensureAuthenticated,
  //   GlobalController.includeDelete
  // );

  // //Excluded
  // app.post(
  //   "/admin/global/exclude/:id",
  //   ensureAuthenticated,
  //   GlobalController.exclude
  // );
  // app.delete(
  //   "/admin/global/exclude/:id",
  //   ensureAuthenticated,
  //   GlobalController.excludeDelete
  // );

  // //Location
  // app.delete(
  //   "/admin/global/location/:id",
  //   ensureAuthenticated,
  //   GlobalController.locationDelete
  // );
  // app.post(
  //   "/admin/global/location/:id",
  //   ensureAuthenticated,
  //   GlobalController.locationAdd
  // );

  // //get thumbnail image form
  // app.get("/admin/global/image", ensureAuthenticated, GlobalController.image);
  // app.post(
  //   "/admin/global/image",
  //   ensureAuthenticated,
  //   GlobalController.imageUplaod
  // );
  // //Image Edit Section
  // app.put(
  //   "/admin/global/image/:id",
  //   ensureAuthenticated,
  //   GlobalController.imageUpdate
  // );

  // //get banner image form
  // app.get("/admin/global/banner", ensureAuthenticated, GlobalController.banner);
  // app.post(
  //   "/admin/global/banner",
  //   ensureAuthenticated,
  //   GlobalController.imageBannerUplaod
  // );
  // //Image Edit Section
  // app.put(
  //   "/admin/global/banner/:id",
  //   ensureAuthenticated,
  //   GlobalController.imageBannerUpdate
  // );

  // //Gallery section
  // app.get(
  //   "/admin/global/gallery/:id",
  //   ensureAuthenticated,
  //   GalleryController.gallery
  // );
  // app.post(
  //   "/admin/global/gallery/:id",
  //   ensureAuthenticated,
  //   GalleryController.galleryUpload
  // );
  // app.delete(
  //   "/admin/global/gallery/:id",
  //   ensureAuthenticated,
  //   GalleryController.delete
  // );

  // //Price Manage
  // app.put(
  //   "/admin/global/pricesale/:id",
  //   ensureAuthenticated,
  //   PriceSaleController.priceSaleUpdate
  // );
};
