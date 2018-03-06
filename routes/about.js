const AboutController = require('../controllers/admin/aboutController');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

module.exports = (app) => {

    //888888888888888888888888888
    //88   About Routes    88
    //888888888888888888888888888

    //Get all Contact List
    app.get('/admin/about',AboutController.getAll);

     //Get all about List
     app.get('/admin/about/add', AboutController.addForm);
     
    //Create new about 
    app.post('/admin/about', AboutController.create);

    //Edit form
    app.get('/admin/about/:id', AboutController.editForm);

    //Edit process
    app.put('/admin/about/:id', AboutController.editUpdate);

    //Delete about
    app.delete('/admin/about/:id', AboutController.delete);

}