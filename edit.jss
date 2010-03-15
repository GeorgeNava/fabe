/* edit.jss?url=anypost */

var view,model,data={};
model     = require('./models.jss');
data.post = model.getPost(request.get.url);
view      = new Template().process('edit',data);
response.write(view);
