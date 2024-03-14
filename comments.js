// create web server

// Require the http module
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var qs = require('querystring');
var comments = require('./comments.json');

// Create a server
http.createServer(function (req, res) {
  // Get the URL
  var urlParts = url.parse(req.url);

  // Check the URL
  if(urlParts.pathname == '/') {
    // Read the file
    fs.readFile('index.html', function(err, data) {
      // Write the file to response
      res.end(data);
    });
  } else if(urlParts.pathname == '/comments') {
    // Check the request method
    if(req.method == 'POST') {
      var body = '';

      // Read the data
      req.on('data', function(data) {
        body += data;
      });

      // When the request ends
      req.on('end', function() {
        // Parse the body
        var POST = qs.parse(body);

        // Add the comment
        comments.push(POST.comment);

        // Save the comments
        fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
          // Send the response
          res.end('{"status": "success"}');
        });
      });
    } else {
      // Send the comments
      res.end(JSON.stringify(comments));
    }
  } else {
    // Get the file
    var filePath = path.join(__dirname, urlParts.pathname);

    // Read the file
    fs.readFile(filePath, function(err, data) {
      // Write the file to response
      res.end(data);
    });
  }
}).listen(3000);

console.log('Server running at http://localhost:3000/');