// Import our authentication controller
var authController = require("../controllers/authcontroller");

// These routes all correspond to actions taken when signing up/registering or signing in to the app.
module.exports = function(app, passport) {
    app.get('/register', authController.register);

    app.get('/signin', authController.signin);

    app.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',

        failureRedirect: '/register'
    }));

    app.get('/dashboard', isLoggedIn, authController.dashboard);

    app.get('/logout', authController.logout);

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',

        failureRedirect: '/signin'
    }));


    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())

            return next();

        res.redirect('/signin');
    }


}