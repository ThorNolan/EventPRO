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

//=================================== ROUTING ===========================================

// Import routes from controllers and give the server access to them.
var routes = require('./controllers/authcontroller.js');
var routes2 = require('./controllers/authenticate.js');
// MORE ROUTES HERE

// Tell our app to use the imported routes.
app.use(routes);
app.use(routes2);

//================================ PASSPORT CONFIG =======================================

// Import authentication.js file.
var authRoute = require('./controllers/authenticate.js')(app,passport);

// Require config file for configuring passport methods from the server.
require('./config/passport.js')(passport, db.Users);

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
  key: '',
  secret: '',
  resave: true,
  saveUninitialized: false,
  cookie: {
    expires: 600000,
    httpOnly: false
  }
}));

// Initialize passport and tell our app to use sessions.
app.use(passport.initialize());
app.use(passport.session());


//=================================== INITIATION =========================================

// Sync with sequelize then start server so that it can begin listening for client requests.
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, HOST, function() {
    console.log('Server listening on: http://localhost:' + PORT);
  });
});