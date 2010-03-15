/* delete.jss?url=anypost */

var model,ok;
model = require('./models.jss');
ok    = model.deletePost(request.post.url);
response.write(ok);
