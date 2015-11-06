// Load the http module to create an http server.
var http = require('http');
var a = 0;
var contato = require("./kanashiro_test_require.js");
// Configure our HTTP server to respond with Hello World to all requests.
var http = require("http"),
    onRequest = function (request, response) {
        console.log("Request received.");
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.write("Hello World: " + a++);
       
        response.write(contato.getContact("kanashiro"));
         response.end();
    };



http.createServer(onRequest).listen(8000);
console.log("node.js server has started");