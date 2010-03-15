/* update.jss */

var model,feed,post;
model = require('./models.jss');
feed  = require('./feeder.jss');

post={
  content : cleanContent(request.post.xcontent),
  summary : cleanSummary(request.post.xcontent)
}

model.updatePost(post);  // save post
feed.updateFeed();       // update feed

response.status(303); 
response.header({'Location':'admin'}); // redirect to admin page

// Utils
function cleanContent(txt){ return HTML.unescape(txt).replace(/'/g,"\\'"); }
function cleanSummary(txt){ return HTML.unescape(txt).replace(/'/g,"\\'").replace(/<[a-zA-Z\/][^>]*>/gi,'').substr(0,200)+'...'; }
