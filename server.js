/**
 * Created by harva_000 on 4/12/14.
 */
var fs = require('fs');
var mp4 = fs.readFileSync('video/thesis.mp4');
var index = fs.readFileSync('thesis.html');
var port = Number(process.env.PORT || 5000);
require('http').createServer(function(req, res) {
    if (req.url === '/') return res.end(index)
    if (req.url.match(/mp4/)) return res.end(mp4)
    res.end('')
}).listen(port)
console.log('open http://localhost:8080')