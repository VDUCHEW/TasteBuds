var express = require('express');
var db = require('./config/schema');
var http = require('http');
var Promise = require('bluebird');
var bodyParser = require('body-parser');
// var session = require('express-session'); // may remove
// var _ = require('underscore'); // may remove
var app = express();
var postController = require('/routes/posts/postController.js');
var bluebird = require('bluebird');
var db = require('../config/schema.js');

require('./models/followerModel');
require('./models/followerUserModel');
require('./models/hashtagModel');
require('./models/postModel');
require('./models/restaurantModel');
require('./models/userModel');
require('./models/wantToTryModel');
require('./collections/posts');
require('./collections/users');
require('./collections/wantToTrys');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); // fix

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../public'));

// create post
app.post('/api/post', postController.createPost;
);

// fetch all Posts
app.get('/api/posts', postController.getAllPosts;
);

// get single post
app.get('/api/posts/:id', postController.getOnePost;
);
// delete post
app.delete('/api/posts/:id', postController.deletePost;
);
// required for passport
// app.use(session({
//   secret: 'anysecretisok',
//   resave: false,
//   saveUninitialized: true
// })); // session secret

app.listen(process.env.PORT || 3000);
console.log('Listening...');
