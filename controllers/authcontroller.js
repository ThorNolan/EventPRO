var exports = module.exports = {};

// Sign in route for export to auth.js.
exports.signin = function(req, res) {
    res.render('sign-in'); 
}

// Register route for signing up for the app.
exports.register = function(req, res) {
    res.render('register');
}

// Route for rendering dashboard display.
exports.dashboard = function(req, res) {
    res.render('dashboard');
}

// Log out route, hit when logout button on dashboard navbar is pressed.
exports.logout = function(req, res) {
    // End session and redirect to root route.
    req.session.destroy(function(err) {
        res.redirect('/');
    });
}