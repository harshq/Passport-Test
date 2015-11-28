var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user.js');


module.exports = function(passport) {

	passport.serializeUser(function(user, cb) {
	  cb(null, user.id);
	});

	passport.deserializeUser(function(id, cb) {
	  User.findById(id, function (err, user) {
	    if (err) { return cb(err); }
	    cb(null, user);
	  });
	});

	passport.use('local-signup' , new LocalStrategy({

		usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true

	} , function(req, email , password, done){

		process.nextTick(function(){

			//console.log(req.body);

			 User.findOne({ 'local.email' :  email }, function(err, user) {
            
            if (err)
                return done(err);

            if (user) {

            	console.log('email already there');
                return done(null, false, req.flash('loginMessage', 'Email is already taken'));
            } else {

                var newUser = new User();

                newUser.local.name = req.body.name;
                newUser.local.email = email;
                newUser.local.password = newUser.createHash(password);

                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

		});

	});


}));



//=========================================================================================================================

	passport.use('local-signin' , new LocalStrategy({

		usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true

	} , function(req, email , password, done){

		process.nextTick(function(){

			//console.log(req.body);

		User.findOne({ 'local.email' :  email }, function(err, user) {
            
            if (err)
                return done(err);

            if (!user) {

            	console.log('user not found');
                return done('user not found', false, req.flash('loginMessage', 'User Not Found'));
            } 
            else if (user){

            	if(!user.validPassword(password)){
            		console.log('password not match');
            		
            		return done('password not match', false , req.flash( 'loginMessage','Password not matched' ));
            	}

            }


            return done(null , user);

		});

	});


}));




};