var Reading = module.exports = {};
var read = require('node-readability');
var URL = process.argv[2] || 'http://howtonode.org/really-simple-file-uploads';
Reading.readArticle = function(url, callback) {
    read(url, function(err, article, meta) {
        var data = '<!DOCTYPE html>' +
            '<html><head>' +
            '<meta charset="utf-8">' +
            '<title>' + article.title + '</title>' +
            '<meta name="viewport" content="width=device-width, initial-scale=1">' +
            '<link rel="stylesheet" href="my.css" />' +
            '</head>';

        data += article.content || '<h1>It failed...</h1>';
        data += '</body></html>';
        callback(err, data);
    });

};