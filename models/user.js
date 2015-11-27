var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var userSchema = new Schema({

	local            : {
		name 		 : String, 
        email        : String,
        password     : String,
    },

    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

userSchema.methods.createHash = function(password) {
	return bcrypt.hashSync( password , bcrypt.genSaltSync(8) , null );
};

userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync( password , this.local.password );
};



module.exports = mongoose.model('User' , userSchema);