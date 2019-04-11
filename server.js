//================================= SET UP =============================================

// Set up dotenv.
require('dotenv').config()

//=============================== DEPENDENCIES ==========================================

// Require express and express-handlebars.
var express = require('express');
var exphbs = require('express-handlebars');

// Require passport and express session for tracking cookies for users revisiting the app.
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');

// Require database models.
var db = require("./models");

//======================== EXPRESS/HANDLEBARS CONFIGURATION =============================

// Set initial port and host and allow port to be set by Heroku.
var PORT = process.env.PORT || 8080;
var HOST = '0.0.0.0';

// Set up Express server. 
var app = express();

// Serve static content for the app from the public directory.
app.use(express.static('public'));

// Sets up the Express app to handle data parsing with built-in middleware.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Tell app to use handlebars and set default page to serve.
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//================================ PASSPORT CONFIG =======================================

// Enable CORS to prevent access issues in different browsers.
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Origin', 'true');
  res.header('Access-Control-Allow-Origin', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Origin', 'GET, POST, OPTIONS, PUT DELETE');
  next();
});

// Enable session to allow for persistent logins.
app.use(session({
  key: 'user_sid',
  secret: process.env.PASSPORT_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    expires: 600000,
    httpOnly: false
  }
}));

// Initialize passport and tell our app to use session.
app.use(passport.initialize());
app.use(passport.session());

//=================================== ROUTING ===========================================

// Import routes and give the server access to them.
var routes3 = require('./routes/routes.js');
app.use(routes3);

require('./routes/auth.js')(app, passport);

//=================================== INITIATION =========================================

// Import passport strategies to the server.
require('./config/passport.js')(passport, db.Users);

// Sync with sequelize then start server so that it can begin listening for client requests.
db.sequelize.sync().then(function() {
  app.listen(PORT, HOST, function() {
    console.log('Server listening on: http://localhost:' + PORT);
  });
});