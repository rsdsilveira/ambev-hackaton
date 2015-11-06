// Load the http module to create an http server.
var http = require('http');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello kanashiro\n");
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");



var db = new SQL.Database();
// Run a query without reading the results
db.run("CREATE TABLE test (col1, col2);");
// Insert two rows: (1,111) and (2,222)
db.run("INSERT INTO test VALUES (?,?), (?,?)", [1,111,2,222]);

// Prepare a statement
var stmt = db.prepare("SELECT * FROM test WHERE col1 BETWEEN $start AND $end");
stmt.getAsObject({$start:1, $end:1}); // {col1:1, col2:111}

// Bind new values
stmt.bind({$start:1, $end:2});
while(stmt.step()) { //
    var row = stmt.getAsObject();
    console.log("row:" + row);
    console.log("row.toString()" + row.toString());
    // [...] do something with the row of result
}
