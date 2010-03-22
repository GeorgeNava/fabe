/* update.jss */

var model,feed,post;
model = require('./models.jss');
feed  = require('./feeder.jss');

post={
  url     : cleanUrl(request.post.xtitle),
  content : cleanContent(request.post.xcontent),
  summary : cleanSummary(request.post.xcontent)
}

model.updatePost(post);  // save post
feed.updateFeed();       // update feed

response.status(303); 
response.header({'Location':'admin'}); // redirect to admin page

// Utils
function cleanUrl(url){     return url.replace(/[^a-z^A-Z^0-9]/gi,'').toLowerCase(); }
function cleanContent(txt){ return HTML.unescape(txt).replace(/'/g,"\\'"); }
function cleanSummary(txt){ return HTML.unescape(txt).replace(/'/g,"\\'").replace(/<[a-zA-Z\/][^>]*>/gi,'').substr(0,200)+'...'; }
