/**
 * Created by harva_000 on 4/12/14.
 */
var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs")
port = Number(process.env.PORT || 5000);

http.createServer(function(request, response) {

    var uri = url.parse(request.url).pathname
        , filename = path.join(process.cwd(), uri);

    path.exists(filename, function(exists) {
        if(!exists) {
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();
            return;
        }

        if (fs.statSync(filename).isDirectory()) filename += 'thesis.html';

        fs.readFile(filename, "binary", function(err, file) {
            if(err) {
                response.writeHead(500, {"Content-Type": "text/plain"});
                response.write(err + "\n");
                response.end();
                return;
            }

            response.writeHead(200);
            response.write(file, "binary");
            response.end();
        });
    });
    function stream_response( res, file_path, content_type ){
        var readStream = fs.createReadStream(file_path);

        readStream.on('data', function(data) {
            var flushed = res.write(data);
            // Pause the read stream when the write stream gets saturated
            console.log( 'streaming data', file_path );
            if(!flushed){
                readStream.pause();
            }
        });

        res.on('drain', function() {
            // Resume the read stream when the write stream gets hungry
            readStream.resume();
        });

        readStream.on('end', function() {
            res.end();
        });

        readStream.on('error', function(err) {
            console.error('Exception', err, 'while streaming', file_path);
            res.end();
        });

        res.writeHead(200, {'Content-Type': content_type});
    }
}).listen(parseInt(port, 10));

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");