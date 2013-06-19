var http = require('http');
var static = require('node-static');

var files = new static.Server('./public');

var server = http.createServer(function(request, response) {
	files.serve(request, response);
});

server.listen(8888);


var io = require('socket.io').listen(server, { log: false });

var occupancy = new Array();
io.sockets.on('connection', function(socket) {
	console.log('client connected');

	socket.emit('occupy', { seats: occupancy });

	socket.on('occupy', function(data) {
		if (occupancy.indexOf(data.seat) == -1) { // free
			occupancy.push(data.seat);

			socket.emit('occupy_success', data);
			socket.broadcast.emit('occupy', { seats: [ data.seat ] });

			console.log('Seat ' + data.seat + ' occupied');
		}
	});

	socket.on('free', function(data) {
		var idx = occupancy.indexOf(data.seat);
		if (idx != -1) { // occupied
			occupancy.splice(idx, 1);

			socket.emit('free_success', data);
			socket.broadcast.emit('free', { seats: [ data.seat ] });

			console.log('Seat ' + data.seat + ' freed');
		}
	});

	socket.on('hover', function(data) {
		socket.broadcast.emit('hover', { seats: [ data.seat ] });
	});

	socket.on('unHover', function(data) {
		socket.broadcast.emit('unHover', { seats: [ data.seat ] });
	});
});

