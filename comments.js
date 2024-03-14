// Create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');
var comments = require('./comments.json');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// Get comments
app.get('/api/comments', function(req, res) {
  res.json(comments);
});

// Add comments
app.post('/api/comments', function(req, res) {
  var comment = {
    id: Date.now(),