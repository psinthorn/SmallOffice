const IndexController = require('../controllers/IndexController');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

module.exports = (app) => {

   //Welcome landing page
  app.get('/', IndexController.index);

  //about page
  app.get('/about', IndexController.about);  

  //tour List
  app.get('/tours', IndexController.tours);

  app.get('/tour-show/:id', IndexController.tourShow);

  //Contact page
  app.get('/contact-us', IndexController.contact);

  //Maps
  app.get('/maps', IndexController.maps);
  app.get('/geocode/:id', IndexController.geocode);
  app.get('/geocode', IndexController.geocode);

}