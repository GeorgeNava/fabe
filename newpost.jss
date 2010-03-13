/* newpost.jss */

var view,data={};
view = new Template().process('newpost',data);
response.write(view);
