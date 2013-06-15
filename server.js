var http = require('http');
var static = require('node-static');

var files = new static.Server('./public');

var server = http.createServer(function(request, response) {
	files.serve(request, response);
});

server.listen(8080);
