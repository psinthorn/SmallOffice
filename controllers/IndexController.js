module.exports = {


index(req, res){
    res.render('index/welcome');
}, 

about(req, res){

    res.render('index/about');
},

apartments(req, res){
    res.render('index/apartments');
},

contact(req, res){
    res.render('index/contact-us');
}


}