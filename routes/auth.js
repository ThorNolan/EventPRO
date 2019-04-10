// Import our authentication controller
var authController = require("../controllers/authcontroller");

// These routes all correspond to actions taken when signing up/registering or signing in to the app.
module.exports = function(app, passport) {
    app.get('/api/register', authController.register);

    app.get('/api/signin', authController.signin);

    app.post('/api/register', passport.authenticate('local-signup', {
        successRedirect: '/api/dashboard',

        failureRedirect: '/api/register'
    }));

    app.get('/api/dashboard', isLoggedIn, authController.dashboard);

    app.get('/api/logout', authController.logout);

    app.post('/api/register', passport.authenticate('local-signin', {
        successRedirect: '/api/dashboard',

        failureRedirect: '/api/signin'
    }));


    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())

            return next();

        res.redirect('/api/signin');
    }

}