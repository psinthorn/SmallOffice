const IndexController = require('../controllers/IndexController');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

module.exports = (app) => {

   //Welcome landing page
    app.get('/', IndexController.index);

  //about page
  app.get('/about', IndexController.about);  

  //Apartment List
  app.get('/apartments', IndexController.apartments);

  //Contact page
  app.get('/contact-us', IndexController.contact);

}