var express = require('express');
var path = require('path');
var User = require('../models/user.js');

module.exports = function(app, passport){

	var router = express.Router();

	router.route('/')
		.get(function(req, res){
			
			//res.sendFile('../public/basePage.html').status(200);
		});

	router.route('/login')
		.get(function(req, res){
			res.json({ url : 'this is the login page' }).status(200);
		})
		.post(function(req, res){
			var data = req.body;
		






			res.redirect('../');

		});

		router.post('/signup', passport.authenticate('local-signup', {
	        successRedirect : '/success.html', // redirect to the secure profile section
	        failureRedirect : '/fail.html', // redirect back to the signup page if there is an error
	        failureFlash : true // allow flash messages
   		 }));




		// router.post('/signup' , passport.authenticate('local-signup' , {
		//         successRedirect : '../profile',
		//         failureRedirect : '../', 
		//         failureFlash : true 
		//     }))

	// router.route('/signup')
	// 	// .get(function(req, res){
	// 	// 	res.json({ message: req.flash('signupMessage') }).status(200);
	// 	// })
	// 	.post(function(req,res){
	// 		var data = req.body;
			
	// 		passport.authenticate('local-signup' , {
	// 	        successRedirect : '../profile',
	// 	        failureRedirect : '../', 
	// 	        failureFlash : true 
	// 	    });

	// 		// var user = new User();
	// 		// user.local.name = data.txtName;
	// 		// user.local.email = data.txtEmail;
	// 		// user.local.password = user.createHash( data.txtPassword ); 

	// 		// user.save(function(err){
	// 		// 	if(err){
	// 		// 		res.json({ status : "error" }).status(501);
	// 		// 	}else{
	// 		// 		res.json({ status : "success" }).status(201);
	// 		// 	}
	// 		// });

	// 		//res.redirect('../');
	// 	});

	router.route('/all')
		.get(function(req, res){

			User.find({} , function(err , users){
				res.json(users).status(200);	
			});
			
		});

	router.use(isLoggedIn);

	router.route('/profile')
		.get(function(req, res){
			res.json({ url : 'this is the profile page' }).status(200);
		});

	router.route('/logout')
		.get(function(req, res){
			    req.logout();
        		res.redirect('/');
		});




	function isLoggedIn(req, res, next) {
	    if (req.isAuthenticated()){
	        return next();
	    }else{	    
	    	res.json({status : "error" , error : 'You Are Not Logged In'});
		}	
	}



	return router;

};