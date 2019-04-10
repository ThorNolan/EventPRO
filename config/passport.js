//====== This js file contains our passport strategies that will be exported to our controller ===============

// Require bcrypt for user password hashing.
var bcrypt = require('bcrypt');

// The only strategy we will currently be exporting is local sign in/register, though we may integrate more options later
module.exports = function(passport, user) {
    
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;

    // Local sign-up/register strategy
    passport.use('local-signup', new LocalStrategy(
 
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function(req, username, password, done) {
 
            var generateHash = function(password) {
 
                return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
 
            };
 
            User.findOne({
                where: {
                    username: username
                }
            }).then(function(user) {
                if (user) {

                    return done(null, false, {
                        message: 'That username is already taken!'
                    });

                } else {
 
                    var userPassword = generateHash(password);
 
                    var data =
 
                        {
                            username: req.body.username,

                            email: email,
 
                            password: userPassword,
  
                        };
 
                    User.create(data).then(function(newUser, created) {
 
                        if (!newUser) {
 
                            return done(null, false);
 
                        }
 
                        if (newUser) {
 
                            return done(null, newUser);
 
                        }
                    });
                }
 
            });
 
        }
    ));

    // Local sign-in strategy
    passport.use('local-signin', new LocalStrategy(
    
        {
    
            usernameField: 'username',
    
            passwordField: 'password',
    
            passReqToCallback: true // allows us to pass back the entire request to the callback
    
        },
    
    
        function(req, username, password, done) {
    
            var User = user;
    
            // Checks if input password matches stored, hashed password using bCrypt
            var isValidPassword = function(userpass, password) {
    
                return bCrypt.compareSync(password, userpass);
    
            }
    
            User.findOne({
                where: {
                    username: username
                }
            }).then(function(user) {
    
                if (!user) {
    
                    return done(null, false, {
                        message: 'Username does not exist'
                    });
    
                }
    
                if (!isValidPassword(user.password, password)) {
    
                    return done(null, false, {
                        message: 'Incorrect password!'
                    });
    
                }
    
    
                var userinfo = user.get();
                return done(null, userinfo);
    
    
            }).catch(function(err) {
    
                console.log("Error:", err);
    
                return done(null, false, {
                    message: 'Sorry, something went wrong with your sign-in'
                });
    
            });
    
    
        }
    
    ));
}