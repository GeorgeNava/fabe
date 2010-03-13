/* view.jss?url=anypost */

var view,model,data={};
model        = require('./models.jss');
data.post    = model.getPost(request.get.url);
data.entries = model.getLastEntries(10);
view         = new Template().process('view',data);
response.write(view);


