/* publish.jss */

var model,feed,post;
model = require('./models.jss');
feed  = require('./feeder.jss');

post={
  title   : request.post.xtitle,
  date    : new Date().format('Y-m-d H:i:s'),
  url     : cleanUrl(request.post.xtitle),
  content : cleanContent(request.post.xcontent),
  summary : cleanSummary(request.post.xcontent)
}

model.newPost(post);  // save post
feed.updateFeed();    // update feed

response.status(303); 
response.header({'Location':'.'}); // redirect to main page

// Utils
function cleanUrl(url){     return url.replace(/[^a-z^A-Z^0-9]/gi,'').toLowerCase(); }
function cleanContent(txt){ return HTML.unescape(txt).replace(/'/g,"\\'"); }
function cleanSummary(txt){ return HTML.unescape(txt).replace(/'/g,"\\'").replace(/<[a-zA-Z\/][^>]*>/gi,'').substr(0,200)+'...'; }
