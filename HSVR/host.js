/**
 * Created by victor on 15/6/18.
 */

var base = '/Users/victor/work/github/'
var http = require('http');
var fs = require('fs');
var ctTypes ={
    'css': 'text/css',
    'html': 'text/html',
    'htm': 'text/html',
    'asc': 'text/plain',
    'txt': 'text/plain',
    'rtx': 'text/richtext',
    'rtf': 'text/rtf',
    'sgml': 'text/sgml',
    'sgm': 'text/sgml',
    'tsv': 'text/tab-separated-values',
    'wml': 'text/vnd.wap.wml',
    'wmls': 'text/vnd.wap.wmlscript',
    'etx': 'text/x-setext',
    'xsl': 'text/xml',
    'xml': 'text/xml',
    'js': 'application/x-javascript'
};

var httpHander = function(request, response) {
    var url = parseUrl(base + request.url);
    try {
        if(url.isRoot) {
            response.write('Hello this is Node server!');
        } else {
            var ctType = ctTypes[url.ext] || 'text/plain';
            response.setHeader("Content-Type", ctType);
            var file = fs.readFileSync(url.full, 'utf8');
            response.write(file);
        }
    }catch(ex){
        response.write(ex.message);
    }
    response.end();
}

var server = http.createServer(httpHander);


var parseUrl = function(url) {
    var isRoot = url === base + '/';
    var extReg = /\.(.*)$/;
    var ext = '--';
    var match = extReg.exec(url);

    if(match && match.length > 1) {
        ext = match[1];
    }

    return {
        isRoot: isRoot,
        ext: ext,
        full: url
    }
};

server.listen(3003);
console.log('...');
