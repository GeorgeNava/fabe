/* feedtest.jss */

var model, feed, data={};
model = require('./models.jss');
data.entries = model.getLastEntries(10);
data.updated = new Date(data.entries[0].date).format('c');
feed = new Template({suffix:'xml'}).process('feeder',data);
response.write(feed);
