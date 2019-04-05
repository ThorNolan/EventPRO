//=============================== DEPENDENCIES ==========================================

var express = require("express");

var exphbs = require("express-handlebars");

//======================== EXPRESS/HANDLEBARS CONFIGURATION =============================

// Set initial port and host and allow port to be set by Heroku.
var PORT = process.env.PORT || 8080;
var HOST = "0.0.0.0";

// Set up Express server. 
var app = express();

// Serve static content for the app from the public directory.
app.use(express.static("public"));

// Sets up the Express app to handle data parsing with built-in middleware.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up handlebars.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//=================================== ROUTING ===========================================

// Import routes from controllers and give the server access to them.
var routes = require("./controllers/butters_controller.js");

// Tell my app to use the imported routes.
app.use(routes);

//=================================== INITIATION =========================================

// Start server so that it can begin listening for client requests.
app.listen(PORT, HOST, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});
