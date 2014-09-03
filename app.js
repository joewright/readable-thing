var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = module.exports = express();
var Reading = require('./reading');
app.set('port', process.env.PORT);
//use static file directory
app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
// application/json
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));
var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");

function validate(str) {
    return regex.test(str || '');
}
app.post('/readit', function(req, res) {
    console.log(req.body);
    if (validate(req.body.url)) {
        Reading.readArticle(req.body.url, function(err, html) {
            if (err) {
                res.send({
                    error: 'Error reading...'
                });
            } else {
                res.set('Content-Type', 'text/html');
                res.send(html);
            }
        });
    } else {
        res.status(400);
        res.send({
            error: 'Invalid url'
        });
    }
});