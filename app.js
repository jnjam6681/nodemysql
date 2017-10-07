const express = require('express');
const mysql = require('mysql');

const app = express();

var port = process.env.PORT || 3000;

// create connection
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  // database : 'nodemysql'
});

// connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('mysql connected...');
});

// create db
app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE nodemysql';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('datbase created...');
  });
});

// create table
app.get('/createtable', (req, res) => {
  let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Posts table created...');
  });
});

// insert data
app.get('/insertdata', (req, res) => {
  let post = {title:'Post Two', body:'This is post number Two'};
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('insert data success!!!');
  });
});

// select data
app.get('/getposts', (req, res) => {
  let sql = 'SELECT * FROM posts';
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send('Posts fetched..');
  });
});

// select single data
app.get('/getpost/:id', (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post fetched..');
  });
});

// update data
app.get('/updatepost/:id', (req, res) => {
  let newTitle = 'Update title';
  let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post updated...');
  });
});

// update data
app.get('/deletepost/:id', (req, res) => {
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post deleted...');
  });
});

app.listen(port, function (req, res) {
  console.log("listening...");
});
