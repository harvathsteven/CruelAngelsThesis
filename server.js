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

        response.Headers.Add("Accept-Ranges", "bytes");
        response.Headers.Add("Content-Range", rangeValue.Replace("=", " ") + (resource.Value.Length - 1).ToString() + "/" + resource.Value.Length.ToString());
        response.StatusCode = HttpStatusCode.PartialContent;
    });
}).listen(parseInt(port, 10));

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");