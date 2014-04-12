/**
 * Created by harva_000 on 4/12/14.
 */
var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('thesis.html');
var port = Number(process.env.PORT || 5000);

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(index);
}).listen(port);