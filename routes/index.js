const IndexController = require('../controllers/IndexController');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

module.exports = (app) => {

   //Welcome landing page
  app.get('/', IndexController.index);

  //about page
  app.get('/about', IndexController.about);  

  //Apartment List
  app.get('/apartments', IndexController.apartments);

  app.get('/apartment-show/:id', IndexController.apartmentsShow);

  //Contact page
  app.get('/contact-us', IndexController.contact);

  //Maps
  app.get('/maps', IndexController.maps);
  app.get('/geocode/:id', IndexController.geocode);
  app.get('/geocode', IndexController.geocode);

}