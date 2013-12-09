var fs = require('fs');
var express = require('express');
var app = express();
app.use(express.bodyParser());


// The database.
var data = [];

// Generate 100 rows of fake data.
function generate() {
	var word = "";
	for(var i = 0; i < Math.random() * 15; i++) {
		word += String.fromCharCode(Math.round(Math.random() * 60) + 65);
	}
	data.push({
		n : Math.random(),
		title : word
	})
}
for(var i = 0; i < 100; i++){
	generate();
}

// Begin app.
app.get('/', function(req, res) {
	res.sendfile('./index.html');
});
app.get('/infinity.js', function(req, res){
	res.sendfile('./infinity.js');
})
app.get('/data', function(req, res){
	res.json(data);
})

app.post('/api', function(req, res) {
	var filters = req.body.filters;
	var sort = req.body.sort;
	var page = parseInt(req.body.page);
	var perPage = parseInt(req.body.perPage);

	if (sort && sort.field && data[0][sort.field]) {
		data.sort(function(a,b){
			return a[sort.field] > b[sort.field] ? 1 : -1;
		})
		if(sort.direction && sort.direction == 'desc'){
			data.reverse();
		}
	}


	for(var i = 0; filters && i < filters.length; i++){
		var fdata = data.filter(function(e){
			return e[filters[i].field].indexOf(filters[i].val) > -1 && e;
		})
	}
	var d = fdata || data;

	var result = [];
	for(var i = page * perPage; i < d.length && i - (page * perPage) < perPage; i++){
		result.push(d[i]);
	}
	res.json({data:result});
});

app.listen(3000);