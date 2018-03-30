const adminController = require('./../controllers/adminController');
const {ensureAuthenticated, ensureGuest} = require('./../helpers/auth');

module.exports = (app) => {

    //888888888888888888888888888
    //88   Admin Routes    88
    //888888888888888888888888888


    //Admin Login page
    app.get('/admin/login', adminController.loginForm);

    //Login POST
    app.post('/admin/login', adminController.login);

    //Logout 
    app.get('/admin/logout', adminController.logout);

    //Get all admin List
    app.get('/admin/admins', ensureAuthenticated, adminController.getAll);

     //Get all admin List
     app.get('/admin/register', ensureAuthenticated, adminController.registerForm);
     
    //Create new admin 
    app.post('/admin/admin', ensureAuthenticated, adminController.create);

    //Edit form
    app.get('/admin/admins/:id', ensureAuthenticated, adminController.editForm);

    //Edit process
    app.put('/admin/admins/:id', ensureAuthenticated, adminController.editUpdate);

    //Delete admin
    app.delete('/admin/admins/:id', ensureAuthenticated, adminController.delete);

}