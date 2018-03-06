const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const keys  = require('./config/key');

//load user model
require('./models/Category');
require('./models/Contents');
require('./models/Users');
require('./models/Apartment');
require('./models/Contact');
require('./models/About');
require('./models/Facility');

//load router
const admin = require('./routes/admin');
const reservations = require('./routes/reservations')
const auth = require('./routes/auth'); 
const mail = require('./routes/mail');
const contents = require('./routes/content');
const index = require('./routes/index');
const contact = require('./routes/contact');
const about = require('./routes/about');
const facility = require('./routes/facility');

const app = express();




//Load config
require('./config/passport')(passport);

//map global promise 
//if not map this promise you will get some error warning when connect to mongoDB 
mongoose.Promise = global.Promise;

//MongoDB connect
mongoose.connect(keys.mongoURI, {
    useMongoClient: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err) );


//connect to mongoDB by Mongoose
// mongoose.Promise = global.Promise;

// if( process.env.NODE_ENV !== 'test'){
//     mongoose.connect('mongodb://localhost/apdlca');
// }




//method-override middle-ware
app.use(methodOverride('_method'));

//body-parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Handlebars Helpers
const { truncate, stripTags, formatDate, select} = require('./helpers/hbs');

//Handlebars middleware
app.engine('handlebars', exphbs({
    helpers: {
        truncate: truncate,
        stripTags: stripTags,
        formatDate: formatDate,
        select: select
    },
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//express-session and cookie-parser
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//set user to global use
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

//set static folder public
app.use(express.static(path.join(__dirname, 'public')));

//use route
//app.use('/admin', admin);
admin(app);
index(app);
contact(app);
about(app);
facility(app);
//facility(app);
//app.use('/contents', contents);
//app.use('/reservations', reservations);
// app.use('/mail', mail);
// app.use('/auth', auth);
// app.use('/', index);

// const port = process.env.PORT || 8888;

// app.listen(port, () => {
//     console.log(`Server started on ${port}`);
// });

module.exports = app;

