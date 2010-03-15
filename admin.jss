// admin.jss

var view,model,data={};
model = require('./models.jss');
data  = model.getLastTitles(20);
view  = new Template().process('admin',data);
response.write(view);
