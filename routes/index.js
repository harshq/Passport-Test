var express = require('express');
var path = require('path');
var User = require('../models/user.js');

module.exports = function(app, passport){

	var router = express.Router();

	// router.route('/login')
	// 	.post(passport.authenticate('local-signin', {
	//         	successRedirect : '/success.html', // redirect to the secure profile section
	//         	failureRedirect : '/fail.html', // redirect back to the signup page if there is an error
	//         	failureFlash : true // allow flash messages
 //   		 	}));





	router.route('/login')
		.post(  function(req,res,next){

			passport.authenticate('local-signin',function(err, user , info){
				if(err){ 
					console.log('index : 1');	
					res.json({ error : err }).status(500);
				}else{
					req.logIn(user , function(err0){
						console.log('index : 2');	
						if(err0){
							console.log('index : 3');	
							res.json({ error : err0 }).status(500);
						}else{
							console.log('index : 4');	
							res.json({ user }).status(200);
						}
					});
				}
					
			})(req, res, next);


		});


	router.route('/signup')
		.post(passport.authenticate('local-signup', {
	        	successRedirect : '/success.html', // redirect to the secure profile section
	        	failureRedirect : '/fail.html', // redirect back to the signup page if there is an error
	        	failureFlash : true // allow flash messages
   		 	}));

	router.use(isLoggedIn);



	router.route('/all')
		.get(function(req, res){

			User.find({} , function(err , users){
				res.json(users).status(200);	
			});
			
		});

	router.route('/profile')
		.get(function(req, res){
			res.json({ url : 'this is the profile page' }).status(200);
		});

	router.route('/logout')
		.get( function(req, res){
			
		  req.logout();		   
		  res.redirect("/");

		});




	function isLoggedIn(req, res, next) {
	    if (req.isAuthenticated()){
	        return next();
	    }else{	    
	    	res.json({status : "error" , error : 'You Are Not Logged In'}).status(401);
		}	
	}



	return router;

};