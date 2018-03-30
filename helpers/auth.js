// //passport helpers
// module.exports = {
//     ensureAuthenticated: (req, res, next) => {
//         if (req.isAuthenticated()) {
//             return next();
//         }
//         res.redirect('/contact-us');
//     },
//     ensureGuest: (req, res, next) => {
//         if(req.isAuthenticated()){
//             res.redirect('/about');
//         }else{
//             return next();
//         }
//     }

// }

module.exports = {
    ensureAuthenticated: function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg', 'Not authorize please login');
        res.redirect('/admin/login');
    }
};

