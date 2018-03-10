const adminController = require('../controllers/adminController');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

module.exports = (app) => {

    //888888888888888888888888888
    //88   Admin Routes    88
    //888888888888888888888888888


    //Admin Login page
    app.get('/admin/login', adminController.loginForm);

    //Get all admin List
    app.get('/admin/admins', adminController.getAll);

     //Get all admin List
     app.get('/admin/register', adminController.registerForm);
     
    //Create new admin 
    app.post('/admin/admin', adminController.create);

    //Edit form
    app.get('/admin/admins/:id', adminController.editForm);

    //Edit process
    app.put('/admin/admins/:id', adminController.editUpdate);

    //Delete admin
    app.delete('/admin/admins/:id', adminController.delete);

}