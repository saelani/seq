var express = require('express')
var app = express()
var passport = require('passport')
var session = require('express-session')
var bodyParser = require('body-parser')
var env = require('dotenv') //.load()
var exphbs = require('express-handlebars')
 
 
//For BodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
 
 
// For Passport
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
 
 
//For Handlebars
//app.set('views', './seq/views')
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
 
 
 
app.get('/', function(req, res) {
 
    res.send('Welcome to Passport with Sequelize');
 
});
 
//Models
var models = require("./models");
 
//Routes
 
var authRoute = require('./routes/auth')(app,passport)
 
 
//load passport strategies
 
//require('./seq/config/passport/passport.js')(passport, models.user);
require('./config/passport/passport') (passport, models.user);
 
//Sync Database
 
models.sequelize.sync().then(function() {
 
    console.log('Nice! Database looks fine')
 
 
}).catch(function(err) {
 
    console.log(err, "Something went wrong with the Database Update!")
 
});
 
 
app.listen(5000, function(err) {
 
    if (!err)
 
        console.log("Site is live");
         
    else console.log(err)
 
});