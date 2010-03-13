/* index.jss */

var model, view, data;
model = require('./models.jss');
data  = model.getLastEntries(10);
view  = new Template().process('main',data);
response.write(view);