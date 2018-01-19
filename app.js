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
require('./models/Users');
require('./models/Stories');
require('./models/Tours');

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

//load auth router
const auth = require('./routes/auth'); 
const stories = require('./routes/stories');
const tours = require('./routes/tours');
// const stories = require('./routes/transfers');
const index = require('./routes/index');

const app = express();

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

//use auth route
app.use('/tours', tours);
app.use('/stories', stories);
app.use('/auth', auth);
app.use('/', index);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});

