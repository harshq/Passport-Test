var express = require('express');
var path = require('path');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var passport = require('passport');
//var flash = require('connect-flash');
var session = require('express-session');





var port = process.env.PORT || 3000;
var app = express();

var routes = require('./routes/index')(app , passport);
//var users = require('./routes/users');

var configDB = require('./config/database.js');
var ConfigPassport = require('./config/passport')(passport);

mongoose.connect( configDB.url );



app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

//------------------------------------------------------------------
app.use(session({ secret: 'iamawesome' })); 
app.use(passport.initialize());
app.use(passport.session()); 
// app.use(flash());
//------------------------------------------------------------------

app.get('/' , function(req,res){
  res.json({ status : 'active' }).status(200);
});


app.use( '/api' , routes );






app.listen(port , function(){
  console.log("Magic happens at http://localhost:" + port );
});








