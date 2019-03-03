const PolicyController = require('./../controllers/admin/policyController');
const {ensureAuthenticated, ensureGuest} = require('./../helpers/auth');

module.exports = (app) => {

    //888888888888888888888888888
    //88   About Routes    88
    //888888888888888888888888888

    //Get all Policy List
    app.get('/admin/policy', ensureAuthenticated, PolicyController.getPolicy);

     //Get all about List
     app.get('/admin/policy/add', ensureAuthenticated, PolicyController.policyForm);
     
    //Create new about 
    app.post('/admin/policy',ensureAuthenticated, PolicyController.addPolicy);

    //Edit form
    app.get('/admin/policy/:id', ensureAuthenticated, PolicyController.editPolicyForm);

    //Edit process
    app.put('/admin/policy/:id', ensureAuthenticated, PolicyController.editPolicy);

    //Edit image
    //app.put('/admin/Policy/image/:id', ensureAuthenticated, PolicyController.addPolicy;

    //Delete about
    app.delete('/admin/policy/:id', ensureAuthenticated, PolicyController.delete);

}