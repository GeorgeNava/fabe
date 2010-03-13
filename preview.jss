/* preview.jss */

var view,data={};
data.title   = request.post.xtitle;
data.content = request.post.xcontent;
view = new Template().process('preview',data);
response.write(view);
