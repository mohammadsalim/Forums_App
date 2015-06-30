var express = require('express'),
    router  = express.Router(),
    Forum    = require('../models/forum.js');

// INDEX

router.get('/', function(req, res){
  Forum.find({}, function(err, forumsArray){
    if (err){
      console.log(err);
    } else {
      console.log("forumsArray: " + forumsArray);
      res.render('forums/index', {forums: forumsArray});
    };
  });
});

// NEW

router.get('/new', function(req, res){
  res.render('forums/new');
});

// CREATE

router.post('/', function(req, res){
  console.log(req.body.forum);
  var newForum = new Forum(req.body.forum);

  newForum.save(function(err, forum){
    if (err) {
      console.log(err);
    } else {
      console.log(forum);
      res.redirect(301, '/forums');
    }
  })
});

// SHOW

router.get('/:id', function(req, res){
var forumId = req.params.id;
Forum.findOne({_id: forumId}, function(err, foundForum) {
  if (err) {
    console.log(err)
  } else {
    res.render('forums/show', {forum: foundForum})
    }
  })
});

// DELETE

router.delete('/:id', function(req, res){

});

// EDIT

router.get('/:id/edit', function(req, res){

});

// UPDATE

router.patch('/:id', function(req, res){

});

module.exports = router;
