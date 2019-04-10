var exports = module.exports = {};

// Sign in route for export to auth.js.
exports.signin = function(req, res) {
    res.render('signin'); 
}

// Register route for signing up for the app.
exports.register = function(req, res) {
    res.render('register');
}

// Log out route, hit when logout button on dahboard navbar is pressed.
exports.register = function(req, res) {
    // End session and redirect to root route.
    req.session.destroy(function(err) {
        res.redirect('/');
    });
}