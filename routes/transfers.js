
const TransferController = require('./../controllers/admin/transfersController');
const {ensureAuthenticated, ensureGuest} = require('./../helpers/auth');

module.exports = (app) => {

    //888888888888888888888888888
    //88   transfers Routes        88
    //888888888888888888888888888

    app.get('/admin/transfers', ensureAuthenticated, TransferController.getAll) 

    app.get('/admin/transfer/add', ensureAuthenticated, TransferController.addForm);

    app.get('/admin/transfer/edit/:id', ensureAuthenticated, TransferController.editForm)

    app.post('/admin/transfer', ensureAuthenticated, TransferController.create);

    app.put('/admin/transfer/:id', ensureAuthenticated, TransferController.editUpdate);

    app.put('/admin/transfer/rate/:id', ensureAuthenticated, TransferController.updateRate );

    app.put('/admin/transfer/sedan/:id', ensureAuthenticated, TransferController.updateSedan );

    app.put('/admin/transfer/suv/:id', ensureAuthenticated, TransferController.updateSuv );

    app.put('/admin/transfer/minibus/:id', ensureAuthenticated, TransferController.updateMinibus );

    app.delete('/admin/transfer/:id', ensureAuthenticated, TransferController.delete);


};