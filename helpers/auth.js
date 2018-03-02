//passport helpers
module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/contact-us');
    },
    ensureGuest: (req, res, next) => {
        if(req.isAuthenticated()){
            res.redirect('/about');
        }else{
            return next();
        }
    }

}

