
var webService;

var setup = function() {
	buildTable();
	webService = new WebService(window.location.origin);
};

var toggle = function(seat) {
	if (seat.classList.contains('occupied')) {
		// cannot toggle others'
		return;
	}

	if (seat.classList.contains('mine')) {
		webService.free(seat.id);
	} else {
		webService.occupy(seat.id);
	}
}


var width = 32;
var height = 16;

var buildTable = function() {
	var seats = '';

	// draw thead
	var thead = document.createElement('thead');
	var hr = document.createElement('tr');

	hr.appendChild(document.createElement('th'));
	for (var c = 0; c < width; c++) {
		var th = document.createElement('th');
		th.innerText = getColumn(c);
		hr.appendChild(th);
	}
	thead.appendChild(hr);

	// draw tbody
	var tbody = document.createElement('tbody');
	for (var r = 0; r < height; r++) {
		var tr = document.createElement('tr');

		var td = document.createElement('td');
		td.innerText = getRow(r);

		tr.appendChild(td);
		for (var c = 0; c < width; c++) {
			td = document.createElement('td');
			td.id = getRow(r) + '' + getColumn(c);
			td.className = 'seat';

			tr.appendChild(td);
		}

		tbody.appendChild(tr);
	}

	var room = document.getElementById('room');
	room.appendChild(thead);
	room.appendChild(tbody);
	room.addEventListener('click', function(event) { return toggle(event.target); });
};

var getColumn = function(index) {
	return Math.abs(width - index * 2) + Math.round(index / width);
};

var getRow = function(index) {
	var result = '';
	do {
		result = String.fromCharCode((index % 26) + 65) + result;
		index = (index / 26) - 1;
	} while (index >= 0)

	return result;
};

