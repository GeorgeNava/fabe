var MySQL = require('mysql').MySQL;

var Config = {
  datahost: 'localhost',
  username: 'root'     ,
  password: '00000000' ,
  database: 'myblog'
};

function SQL(){
  var db      = null;
  var numRows = null;
  var lastId  = null;
}

SQL.prototype.connect=function(){
  if(!this.db){
    this.db = new MySQL().connect(Config.datahost,Config.username,Config.password,Config.database);
  }
}

SQL.prototype.disconnect=function(){
  if(this.db){ this.db.close(); }
}

SQL.prototype.getValue=function(sql,values){
  var query,rows,data=null;
  query = this.query(sql,values);
  rows  = query.fetchArrays();
  if(rows.length>0){ data = rows[0][0]; }
  query.close();
  return data;
}

SQL.prototype.getRecord=function(sql,values){
  var query,rows,data=null;
  query = this.query(sql,values);
  rows  = query.fetchObjects();
  if(rows.length>0){ data = rows[0]; }
  query.close();
  return data;
}

SQL.prototype.getRecords=function(sql,values){
  var query,rows,data=null;
  query = this.query(sql,values);
  rows  = query.fetchObjects();
  if(rows.length>0){ data = rows; }
  query.close();
  return data;
}

SQL.prototype.getList=function(sql,values){
  var query,rows,data=null;
  query = this.query(sql,values);
  rows  = query.fetchArrays();
  if(rows.length>0){
    data = [];
    for(i in rows){ data.push(rows[i][0]); } 
  }
  query.close();
  return data;
}

SQL.prototype.getTable=function(sql,values){
  var query,rows,data=null;
  query = this.query(sql,values);
  rows  = query.fetchArrays();
  if(rows.length>0){ data = rows; }
  query.close();
  return data;
}

SQL.prototype.execute=function(sql,values){ /* Insert, Update, Delete */
  var query,rows,data=null;
  var command = sql.substr(0,6).toUpperCase();
  this.query(sql,values);
  this.numRows = this.db.affectedRows();
  if     (command=="INSERT"){ data = this.lastId = this.db.insertId(); }
  else if(command=="UPDATE"){ data = this.numRows; }
  else if(command=="DELETE"){ data = this.numRows; }
  return data;
}

SQL.prototype.query=function(sql,values){
  var query;
  this.connect();
  this.sql = sql = this.parse(sql,values);
  query = this.db.query(sql);
  return query;
}

SQL.prototype.parse=function(sql,values){
  if(!values){ return sql; }
  for(var i in values){ sql=sql.replace(new RegExp("{("+i+")}","g"),values[i]); }
  return sql;
}

exports.SQL = SQL;


/********** MYSQL API **********

  var MySQL = require('mysql').MySQL;
  var db = new MySQL() - creates new mysql instance
  db.connect(host, user, password, db) - connects to database
  db.close() - closes connection to database
  db.queryCount - number of executed queries
  db.affectedRows() - returns number of rows affected by a query
  db.insertId() - returns ID of last inserted row
  db.escape(str) - escapes a string so it can be used in a query

  r = db.query(query)  - executes a query
  r = db.nextResult()  - retrieves next result from a multi-result set
  n = r.numRows()      - returns number of rows in query result
  n = r.numFields()    - returns number of fields in query result
  a = r.fetchNames()   - returns an array with field names
  a = r.fetchArrays()  - returns query results as an array of arrays
  o = r.fetchObjects() - returns query results as an array of hashes
  r.close()            - closes the result and deallocates its memory

********************************/
