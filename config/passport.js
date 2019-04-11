//====== This js file contains our passport strategies that will be exported to our controller ===============

// Require bcrypt for user password hashing.
var bcrypt = require('bcrypt');

// The only strategy we will currently be exporting is local sign in and local register, though we may integrate more options later
module.exports = function(passport, user) {

    // Serialize user id for session.
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        User.findAll({
            where: {
                id: id
            }
        }).then(function(user) {
            console.log(user);
            if (user) {
                done(null, user);
            } else {
                done(user.errors, null);
            }
        });
    });
    
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;

    // Local sign-up/register strategy for new users.
    passport.use('local-signup', new LocalStrategy(
 
        {
            usernameField: 'username',
            passwordField: 'userpassword',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function(req, username, password, done) {
 
            var generateHash = function(password) {
                return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
            };
            
            // Check to make sure username is not already taken, and alert user if it is.
            User.findOne({
                where: {
                    username: username
                }
            }).then(function(user) {

                if (user) {
                    // return done(null, false, req.flash("That username is already taken!"))
                    return done(null, false, {
                        message: 'That username is already taken!'
                    });

                } else {
 
                    // Encrypt password data with bCrypt
                    var userPassword = generateHash(password);
 
                    var data =
                        {
                            userName: username,

                            //email: email,
 
                            userPassword: userPassword,
  
                        };
 
                    User.create(data).then(function(newUser) {
 
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

    // Local sign-in strategy for returning users.
    passport.use('local-signin', new LocalStrategy(
    
        {
            usernameField: 'username',
    
            passwordField: 'userpassword',
    
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
    
        function(req, username, password, done) {
    
            var User = user;
    
            // Checks if input password matches stored, hashed password. 
            var isValidPassword = function(userpass, password) {
    
                return bcrypt.compareSync(password, userpass);
    
            }
    
            User.findOne({
                where: {
                    username: username
                }
            }).then(function(user) {
                
                // Check to make sure username exists.
                if (!user) {
    
                    return done(null, false, {
                        message: 'Username does not exist'
                    });
    
                }
    
                // Make sure input password is valid, and alert user if it isn't.
                if (!isValidPassword(user.userPassword, password)) {
    
                    return done(null, false, {
                        message: 'Incorrect password!'
                    });
    
                }
    
                // If inputs are valid, return success.
                var userinfo = user.get();
                return done(null, userinfo);
    
            // Account for potential errors. 
            }).catch(function(err) {
    
                console.log("Error:", err);
    
                return done(null, false, {
                    message: 'Sorry, something went wrong with your sign-in'
                });
    
            });
        }
    ));

};