// Load the http module to create an http server.
var http = require('http');
var sql = require('sql.js');
var fs = require('fs');

var express = require("express");
var app = express();
var airgateHistory = [];
var signalLevel = "";

app.get("/", function(req, res) {
	res.sendfile('index.html')
});

app.get("/api/stub", function(req, res) { 
	res.setHeader('Content-Type', 'application/json');
	stubReturn = {"param1":"value1", "param2":"value2"};
	res.send(JSON.stringify(stubReturn));
});


 /* serves all the static files */
 app.get(/^(.+)$/, function(req, res){ 
     console.log('static file request : ' + req.params);
     res.sendfile( __dirname + req.params[0]); 
 });

 var port = process.env.PORT || 3000;
 app.listen(port, function() {
   console.log("Listening on " + port);
 });


// Load the db from file
var dbFileName = 'db.sqlite';
var filebuffer = fs.readFileSync(dbFileName);
var db = new SQL.Database(filebuffer);
// Run a query without reading the results
db.run("CREATE TABLE IF NOT EXISTS test (col1, col2);");
// Insert two rows: (1,111) and (2,222)
db.run("INSERT INTO test VALUES (?,?), (?,?)", [1,111,2,222]);

// Prepare a statement
var stmt = db.prepare("SELECT * FROM test WHERE col1 BETWEEN $start AND $end");
stmt.getAsObject({$start:1, $end:1}); // {col1:1, col2:111}

// Bind new values
stmt.bind({$start:1, $end:2});
while(stmt.step()) { //
    var row = stmt.get();
    console.log("row[0]:" + row[0] + "   row[1]:" + row[1]);
}

var data = db.export();
var buffer = new Buffer(data);
fs.writeFileSync(dbFileName, buffer);
