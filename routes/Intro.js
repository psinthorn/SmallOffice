const IntroController = require('./../controllers/admin/introController');
const {ensureAuthenticated, ensureGuest} = require('./../helpers/auth');

module.exports = (app) => {

    //888888888888888888888888888
    //88   About Routes    88
    //888888888888888888888888888

    //Get all Contact List
    app.get('/admin/intro', ensureAuthenticated, IntroController.getIntro);

     //Get all about List
     app.get('/admin/intro/add', ensureAuthenticated, IntroController.introForm);
     
    //Create new about 
    app.post('/admin/apartment-intro',ensureAuthenticated, IntroController.addIntro);

    //Edit form
    app.get('/admin/apartment-intro/:id', ensureAuthenticated, IntroController.editIntroForm);

    //Edit process
    app.put('/admin/apartment-intro/:id', ensureAuthenticated, IntroController.editIntro);

    //Edit image
    //app.put('/admin/intro/image/:id', ensureAuthenticated, IntroController.addIntro;

    //Delete about
    app.delete('/admin/apartment-intro/:id', ensureAuthenticated, IntroController.delete);

}