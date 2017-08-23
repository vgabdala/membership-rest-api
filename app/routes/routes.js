var express     = require('express');
var apiRoutes   = express.Router(); 
var mongoose    = require('mongoose');
var Member      = require('../models/member');

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

  if (mongoose.Types.ObjectId.isValid(req.params.memberId)){
    
    Member.find({_id: req.params.memberId}, function(err, members){
      if (err) throw err;
      return res.json(members);
    });

  } else {
    return res.json({ success: false, message: 'View member failed. The id provided is an invalid ObjectId.' });
  }

});

//Edit Member
apiRoutes.patch('/member/:memberId', function(req, res) {

  if (mongoose.Types.ObjectId.isValid(req.params.memberId)){
    
    Member.update({_id: req.params.memberId}, req.body, function(err, result){
      if (err) throw err;
      return res.json(result);
    });
    
  } else {
    return res.json({ success: false, message: 'Update member failed. The id provided is an invalid ObjectId.' });  
  }

});

//Delete Member
apiRoutes.delete('/member/:memberId', function(req, res) {

  if (mongoose.Types.ObjectId.isValid(req.params.memberId)){
    
    Member.remove({_id: req.params.memberId}, function(err, result){
      if (err) throw err;
      return res.json(result);
    });
    
  } else {
    return res.json({ success: false, message: 'Delete member failed. The id provided is an invalid ObjectId.' });  
  }

});

function validateRequest(req, res){

  if(req.body.firstName == null || req.body.firstName == ''){
    res.json({ success: false, message: 'Create member failed. firstName must be provided.' });
    return false;
  } 

  if(req.body.lastName == null || req.body.lastName == ''){
    res.json({ success: false, message: 'Create member failed. lastName must be provided.' });
    return false;
  } 

  if(req.body.email == null || req.body.email == ''){
    res.json({ success: false, message: 'Create member failed. email must be provided.' });
    return false;
  }

  if(req.body.dob == null || req.body.dob == ''){
    res.json({ success: false, message: 'Create member failed. Date of birth (dob) must be provided.' });
    return false;
  } 

  if(req.body.createdByUserId == null || req.body.createdByUserId == ''){
    res.json({ success: false, message: 'Create member failed. createdByUserId must be provided.' });
    return false;
  }

  return true;
}

module.exports = apiRoutes;