CREATE DATABASE  'blog' ;

CREATE TABLE 'posts' (
  'id'      int(11)      NOT NULL AUTO_INCREMENT,
  'date'    datetime     DEFAULT NULL,
  'url'     varchar(60)  DEFAULT NULL,
  'title'   varchar(120) DEFAULT NULL,
  'content' text,
  'summary' text,
  PRIMARY KEY ('id')
);
