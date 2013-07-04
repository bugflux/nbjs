
function WebService(endpoint) {

	// setup the web socket connection
	var socket = io.connect(endpoint);
	console && console.log('Connected to server');

	// define some "service" methods
	this.occupy = function(seat) {
		socket.emit('occupy', { seat: seat })
	};

	this.free = function(seat) {
		socket.emit('free', { seat: seat })
	};

	this.hover = function(seat) {
		socket.emit('hover', { seat: seat });
	};

	this.unHover = function(seat) {
		socket.emit('unHover', { seat: seat });
	};


	// handlers for third party events
	socket.on('occupy', function(data) {
		for (var s in data.seats) {
			document.getElementById(data.seats[s]).classList.remove('hovered');
			document.getElementById(data.seats[s]).classList.add('occupied');
		}
	});

	socket.on('free', function(data) {
		for (var s in data.seats) {
			document.getElementById(data.seats[s]).classList.remove('occupied');
		}
	});

	socket.on('hover', function(data) {
		for (var s in data.seats) {
			document.getElementById(data.seats[s]).classList.add('hovered');
		}
	});

	socket.on('unHover', function(data) {
		for (var s in data.seats) {
			document.getElementById(data.seats[s]).classList.remove('hovered');
		}
	});


	// handlers for results
	socket.on('occupy_success', function(data) {
		document.getElementById(data.seat).classList.add('mine');
		console && console.log('Occupied ' + data.seat);
	});

	socket.on('free_success', function(data) {
		document.getElementById(data.seat).classList.remove('mine');
		console && console.log('Freed ' + data.seat);
	});

};
