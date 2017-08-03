const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const port = process.argv[2] || 8888;

http.createServer(function (request, response) {

    const uri = url.parse(request.url).pathname;
    let filename = path.join(process.cwd(), uri);

    fs.stat(filename, function (err, stat) {

        if (err) return;

        fs.readFile(filename, 'binary', function(err, file) {

            if (err) {
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.write(err + '\n');
                response.end();
                return;
            }

            response.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
            response.write(file, 'binary');
            response.end();

        });

    });

}).listen(parseInt(port, 10));

console.log('Static file server running at\n  => http://localhost:' + port + '/\nCTRL + C to shutdown');