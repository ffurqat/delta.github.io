var config = require('./config.js');
var thinky = require('thinky')(config);
var r = thinky.r;
var type = thinky.type;

var Comment = thinky.createModel('Comment', {
  id: type.string(),
  author: type.string(),
  text: type.string(),
  createdAt: type.date().default(r.now)
});

Comment.ensureIndex("createdAt");

Comment.addListener('ready', function(model) {
  console.log("Table "+model.getTableName()+" is ready");
});

exports.comments = function (req, res) {
  Comment.orderBy({index: r.asc('createdAt')}).run().then(function(comments) {
    res.json(comments);
  }).error(handleError(res));
};
exports.addComment = function (req, res) {
  var newComment = new Comment(req.body);

  newComment.save().then(function(result) {
    res.json({
      result: result
    });
  }).error(handleError(res));
};
exports.deleteComment = function (req, res) {
  Comment.get(req.body.id).run().then(function(post) {
    post.delete().then(function(result) {
      res.json({
        result: result
      });
    }).error(handleError(res));
  }).error(handleError(res));
};

function handleError(res) {
  return function(error) {
    console.log(error.message);
    return res.send(500, {error: error.message});
  }
}
