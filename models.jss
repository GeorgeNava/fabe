var SQL = require('./dataserver.jss').SQL;

function getLastEntries(n){
  var sql,query,data;
  query = 'SELECT * FROM posts ORDER BY date DESC LIMIT {0}';
  sql   = new SQL();
  data  = sql.getRecords(query,[n]);
  sql.disconnect();
  return data;
}

function getLastTitles(n){
  var sql,query,data;
  query = 'SELECT id,title,date,url FROM posts ORDER BY date DESC LIMIT {0}';
  sql   = new SQL();
  data  = sql.getRecords(query,[n]);
  sql.disconnect();
  return data;
}

function newPost(data){
  var sql,query,key;
  query = "INSERT INTO posts(title,date,url,content,summary) VALUES('{title}','{date}','{url}','{content}','{summary}')";
  sql   = new SQL();
  key   = sql.execute(query,data);
  sql.disconnect();
  return key;
}

function getPost(url){
  var sql,query,data;
  query = "SELECT * FROM posts WHERE url='{0}'";
  sql   = new SQL();
  data  = sql.getRecord(query,[url]);
  sql.disconnect();
  return data;
}

function updatePost(data){
  var sql,query,key;
  query = "UPDATE posts set content='{content}', summary='{summary}'";
  sql   = new SQL();
  sql.execute(query,data);
  sql.disconnect();
  return key;
}

function deletePost(url){
  var sql,query,num;
  query = "DELETE FROM posts WHERE url='{0}' LIMIT 1";
  sql   = new SQL();
  num   = sql.execute(query,[url]);
  sql.disconnect();
  return num;
}

exports.newPost        = newPost;
exports.getPost        = getPost;
exports.updatePost     = updatePost;
exports.deletePost     = deletePost;
exports.getLastEntries = getLastEntries;
exports.getLastTitles  = getLastTitles;

