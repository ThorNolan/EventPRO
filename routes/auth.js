// Import our authentication controller
var authController = require("../controllers/authcontroller");

// These routes all correspond to actions taken when signing up/registering or signing in to the app.
module.exports = function(app, passport) {
    app.get('/register', authController.register);

    app.get('/signin', authController.signin);

    // This route will display a message to alert our use if the username they've chosen is already taken.
    app.post('/register', function(req, res, next){
        passport.authenticate('local-signup', function(err, user, info) {
            if (err) return next(err)
            if(!user) {
                // If username is already taken, message from imported from passport strategies (info) will be displayed. 
                return res.render("register", info)
            } else {
                req.logIn(user, function(loginErr){
                    if(loginErr){
                        return next(loginErr)
                    } else {
                        console.log("Registration successful")
                        res.redirect("/dashboard")
                    }
                });
            };
            
        })(req, res, next)
    });

    app.get('/dashboard', isLoggedIn, authController.dashboard);

    app.get('/logout', authController.logout);

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',

        failureRedirect: '/signin'
    }));

    // Function for checking user login status. 
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())

            return next();

        // redirect to sign-in if user isn't logged in.
        res.redirect('/signin');
    };
};