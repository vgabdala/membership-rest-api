// =======================
// get the packages we need ============
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var config = require('./config'); // get our config file

// =======================
// configuration =========
// =======================
var secret = config.mongo.default.secret;
var dbPort = config.mongo.default.port;
var dbHost;
var dbName;

if(app.get('env') == 'production'){
	dbHost = config.mongo.production.host;
	dbName = config.mongo.production.db;
} else {
	dbHost = config.mongo.development.host;
	dbName = config.mongo.development.db;
}

mongoose.connect('mongodb://'+dbHost+':'+dbPort+'/'+dbName, { useMongoClient: true }); // connect to database	
app.set('superSecret', config.mongo.default.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// =======================
// routes ================
// =======================
// basic route
var port = process.env.NODE_PORT || 8080; 
app.get('/', function(req, res) {
    res.send('Hello! The API is at port ' + port + ' /api');
});

// get an instance of the router for api routes
var apiRoutes = express.Router(); 

// route middleware to verify a token
//apiRoutes.use(function(req, res, next) {
  // Call login-rest-api to validate token
//});

// API ROUTES -------------------

// List Members
apiRoutes.get('/members', function(req, res) {
  res.send('To be implemented');
});

//Create Member
apiRoutes.post('/member/create', function(req, res) {

  res.send('To be implemented');

});

//View Member
apiRoutes.get('/member/:memberId/view', function(req, res) {

  res.send('To be implemented');

});

//Edit Member
apiRoutes.post('/member/:memberId/edit', function(req, res) {

  res.send('To be implemented');

});

//Delete Member
apiRoutes.post('/member/:memberId/delete', function(req, res) {

  res.send('To be implemented');

});


// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('membership-rest-api is running on ' + app.get('env') + ' environment on port ' + port);