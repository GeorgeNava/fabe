/* review.jss */

var view,data={};
data.title   = request.post.xtitle;
data.content = request.post.xcontent;
view = new Template().process('review',data);
response.write(view);
