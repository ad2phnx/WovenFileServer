'use strict';

exports.put = put;
exports.get = get;
exports.del = del;

const { exit } = require('process');
var superagent = require('superagent'),
    request = require('request'),
    url = require('url'),
    path = require('path'),
    FormData = require('form-data'),
    fs = require('fs');

require('colors');

var API = 'http://localhost:8080/'
var API_FILES = "files"
var API_UPLOAD = "upload"

var gQuery = {};

function put(file, program) {

    const form = new FormData()
    form.append('file', fs.createReadStream(file));

    var toUrl = API + encodeURIComponent(API_UPLOAD);
    console.log("Making request to: " + toUrl);
    superagent.post(toUrl).type('form').attach('file', file).set(form.getHeaders()).end(function (error, result) {
        if (result && result.statusCode === 403) console.log('Destination ' + toUrl + ' not allowed');
        if (result && result.statusCode !== 200) console.log('Error uploading file: ' + result.statusCode);
        if (error) return exit(error.message);

    });
}

function get(program) {

    console.log("Making request...");
    var toUrl = API + encodeURIComponent(API_FILES);
    console.log("  to path: " + toUrl);
    request.get((toUrl), { qs: gQuery }, function(error, result, body) {

        if (result && result.statusCode === 404) exit('No such url');
        if (error) exit(error.message);

        console.log("Got status message: " + result.message + " status code: " + result.statusCode);

        process.stdout.write(body);

    });

}

function del(fileId, program) {

    console.log("Making request...");
    var toUrl = API + encodeURIComponent(API_FILES) + "/" + fileId;
    console.log("  to path: " + toUrl);
    request.delete((toUrl), function(error, result, body) {

        if (result && result.statusCode === 404) exit('No such url');
        if (error) exit(error.message);

        console.log("Got status message: " + result.message + " status code: " + result.statusCode);

        process.stdout.write(body);
    });
}