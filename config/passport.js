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

        function(req, email, password, done) {
 
            var generateHash = function(password) {
 
                return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
 
            };
 
            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
                if (user) {

                    return done(null, false, {
                        message: 'That email is already taken!'
                    });

                } else {
 
                    var userPassword = generateHash(password);
 
                    var data =
 
                        {
                            email: email,
 
                            password: userPassword,
 
                            firstname: req.body.firstname,
 
                            lastname: req.body.lastname
 
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
    
            // by default, local strategy uses username and password, we will override with email
    
            usernameField: 'email',
    
            passwordField: 'password',
    
            passReqToCallback: true // allows us to pass back the entire request to the callback
    
        },
    
    
        function(req, email, password, done) {
    
            var User = user;
    
            var isValidPassword = function(userpass, password) {
    
                return bCrypt.compareSync(password, userpass);
    
            }
    
            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
    
                if (!user) {
    
                    return done(null, false, {
                        message: 'Email does not exist'
                    });
    
                }
    
                if (!isValidPassword(user.password, password)) {
    
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
    
                }
    
    
                var userinfo = user.get();
                return done(null, userinfo);
    
    
            }).catch(function(err) {
    
                console.log("Error:", err);
    
                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });
    
            });
    
    
        }
    
    ));
}