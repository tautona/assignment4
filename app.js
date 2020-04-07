// app.js

const express = require('express');
const path = require('path');
const url = require('url');
const users = require('./routes/users');
const bodyparser = require('body-parser');
const mongoose = require("mongoose");
const cookieparser = require('cookie-parser');
const session = require('express-session');

mongoose.connect(`mongodb+srv://csci31prghp:hopsasa@cluster0-6n8om.mongodb.net/ass4?retryWrites=true&w=majority`).then(()=>{console.log("connected really");})
  .catch((err)=>{
		console.error(`database connection error: ${err}`);
		process.exit();
	});
const app = express();
const db = mongoose.connection;

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(cookieparser('csci31-secret'));
app.use(session({
	secret:"csci31",
	resave: "true",
	saveUninitialized: "true"
}));
app.use(bodyparser.urlencoded({extended: false}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/users', users);
app.get('/', (req, res)=>{
  res.redirect('/users')
});




app.use((req, res, next)=>{
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
