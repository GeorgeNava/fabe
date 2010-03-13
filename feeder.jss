/* feeder.jss */

// Call this method whenever you update the blog to generate feed.xml

function updateFeed(){
  var model, feed, data={};
  model = require('./models.jss');
  data.entries = model.getLastEntries(10);
  data.updated = new Date(data.entries[0].date).format('c');
  feed = new Template({suffix:'xml'}).process('feeder',data);
  saveFeed('feed.xml',feed);
}

function saveFeed(name,text){
  var file = new File(name);
  file.open('w');
  file.write(text);
  file.close();
}

exports.updateFeed=updateFeed;
