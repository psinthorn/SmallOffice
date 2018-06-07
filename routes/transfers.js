
const TransferController = require('./../controllers/admin/transfersController');
const {ensureAuthenticated, ensureGuest} = require('./../helpers/auth');

module.exports = (app) => {

    //888888888888888888888888888
    //88   tour Routes    88
    //888888888888888888888888888

    app.get('/admin/transfers', TransferController.getAll) 

    app.get('/admin/transfer/add', TransferController.addForm);

    app.get('/admin/transfer/edit/:id', TransferController.editForm)

    app.post('/admin/transfer', TransferController.create);

    app.put('/admin/transfer/:id', TransferController.editUpdate);

    app.put('/admin/transfer/sedan/:id', TransferController.updateSedan );

    app.put('/admin/transfer/suv/:id', TransferController.updateSuv );

    app.put('/admin/transfer/minibus/:id', TransferController.updateMinibus );

    app.delete('/admin/transfer/:id', TransferController.delete);


};