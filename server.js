var http = require('http');

var server = http.createServer(function(request, response) {
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.write('Hello\n');

	setTimeout(function() {
		response.end('nodejs\n');
	}, 2000);
});

server.listen(8080);
