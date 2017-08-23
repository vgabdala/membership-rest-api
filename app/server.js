// Dependencies
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var config      = require('./config');
var apiRoutes   = require('./routes/routes');

// Configuration
var env = app.get('env');
var secret = config.mongo.default.secret;
var dbPort = config.mongo.default.port;
var dbHost;
var dbName;

if(env == 'production'){
	dbHost = config.mongo.production.host;
	dbName = config.mongo.production.db;
} else {
	dbHost = config.mongo.development.host;
	dbName = config.mongo.development.db;
}

// Database connection
mongoose.connect('mongodb://'+dbHost+':'+dbPort+'/'+dbName, { useMongoClient: true });
app.set('superSecret', config.mongo.default.secret); 

// Enable parameter parsing through POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable logging of requests
app.use(morgan('dev'));

// Start server
var port = process.env.NODE_PORT || 8080; 
app.get('/', function(req, res) {
    res.send('Hello! The API is at port ' + port + ' /api');
});

app.use('/api', apiRoutes);
app.listen(port);
console.log('membership-rest-api is running on ' + env + ' environment on port ' + port);