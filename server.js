if (!process.env.PORT) {
    process.env.PORT = 3221;
}
var http = require('http');
var app = require('./app');
var cluster = require('cluster');

if (['heroku', 'production'].indexOf(process.env.PLATFORM) !== -1) {
    var cores = require('os').cpus().length;

    if (cluster.isMaster) {
        console.log('starting master: ' + process.pid);
        console.log(process.versions);

        for (i = 0; i < cores; i++) {
            cluster.fork();
        }

        cluster.on('death', function(worker) {
            return console.log('worker ' + worker.pid + ' died');
        });
    } else {
        console.log('starting worker: ' + process.pid);
        startServer();
    }
} else {
    startServer();
}

function startServer() {
    http.createServer(app).listen(process.env.PORT, function() {
        console.log("Express server listening on port " + process.env.PORT);
    });
}