const FacilityController = require('../controllers/admin/facilityController');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

module.exports = (app) => {

//888888888888888888888888888
//88   Facility Routes     88
//888888888888888888888888888

        //Get all facility List
        app.get('/admin/facility',FacilityController.getAll);
    
        //  //Get all facility List
        app.get('/admin/facility/add', FacilityController.addForm);
         
        // //Create new facility 
        app.post('/admin/facility', FacilityController.create);
    
        // //Edit form
        app.get('/admin/facility/:id', FacilityController.editForm);
    
        // //Edit process
        //app.put('/admin/facility/:id', FacilityController.editUpdate);
    
        // //Delete facility
       // app.delete('/admin/facility/:id', FacilityController.delete);


}