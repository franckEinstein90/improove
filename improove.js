var url = require('url');
var http = require('http');
var fs = require('fs');


var qP = require('./queryParser');
var mysql = require('mysql');



fs.readFile("databaseParams", function(err, databaseParameters){
		if (err) throw err; 
		var dbCredentials = JSON.parse(databaseParameters);
		console.log(dbCredentials.host);
		var con = mysql.createConnection({
			host:dbCredentials.host,
			user: dbCredentials.user,
			password: dbCredentials.password, 
			database: dbCredentials.database
		});
		con.connect((err) => {
			if(err) throw err;
			con.query("SELECT * FROM Trainers", (err, result, fields) => {
				if (err) throw err; 
				console.log(result); 
		});
	});
});


http.createServer(function (req, res) {
		var qry = url.parse(req.url, true);

		res.writeHead(200, {'Content-Type': 'text/html'});
		fs.readFile("header.html", (err, header) => {
					if (err) throw err; 
					res.write(header);
					res.write("message");
					var page = qP.parseQuery(qry); 
					fs.readFile(page, (err, data) => {
									if (err) throw err;
									res.write(data);
									res.end();
								})
				})
}).listen(8082);



