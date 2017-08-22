// =======================
// get the packages we need ============
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var config      = require('./config'); // get our config file
var Member      = require('./models/member');

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

function validateRequest(req, res){

  if(req.body.firstName == null){
    res.json({ success: false, message: 'Create member failed. firstName must be provided.' });
    return false;
  } 

  if(req.body.lastName == null){
    res.json({ success: false, message: 'Create member failed. lastName must be provided.' });
    return false;
  } 

  if(req.body.email == null){
    res.json({ success: false, message: 'Create member failed. email must be provided.' });
    return false;
  }

  if(req.body.dob == null){
    res.json({ success: false, message: 'Create member failed. Date of birth (dob) must be provided.' });
    return false;
  } 

  if(req.body.createdByUserId == null){
    res.json({ success: false, message: 'Create member failed. createdByUserId must be provided.' });
    return false;
  }

  return true;
}

// API ROUTES -------------------

// List Members
apiRoutes.get('/member', function(req, res) {
  Member.find(function(err, members){
    if (err) throw err;
    res.json(members);
  });
});

//Create Member
apiRoutes.post('/member', function(req, res) {

  if(validateRequest(req, res)){
      var newMember = new Member({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        email: req.body.email,
        createdByUserId: req.body.createdByUserId
      });

      newMember.save(function(err){
        if(err){
          if(err.code == 11000){
            res.json({ success: false, message: 'Create member failed. Email address already exists.' });
          } else { 
            throw err;
          }
        } else {
          res.json({ success: true, message: 'Member created successfully.' });
        }
      });
  }

});

//View Member
apiRoutes.get('/member/:memberId', function(req, res) {

  if (!mongoose.Types.ObjectId.isValid(req.params.memberId)){
    return res.json({ success: false, message: 'View member failed. The id provided is an invalid ObjectId.' });
  } else {
    Member.find({_id: req.params.memberId}, function(err, members){
      if (err) throw err;
      return res.json(members);
    });
  }

});

//Edit Member
apiRoutes.patch('/member/:memberId', function(req, res) {

  if (!mongoose.Types.ObjectId.isValid(req.params.memberId)){
    return res.json({ success: false, message: 'Update member failed. The id provided is an invalid ObjectId.' });
  } else {
      Member.update({_id: req.params.memberId}, req.body, function(err, result){
        if (err) throw err;
        return res.json(result);
      });
  }

});

//Delete Member
apiRoutes.delete('/member/:memberId', function(req, res) {

  res.send('To be implemented');

});


// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('membership-rest-api is running on ' + app.get('env') + ' environment on port ' + port);