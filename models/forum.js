var mongoose = require('mongoose'),
Schema       = mongoose.Schema;

var forumSchema = Schema({
  author: String,
  title: String,
  subject: String,
  content: String,
});

var Forum = mongoose.model("Forum", forumSchema);

module.exports = Forum;
