#!/usr/bin/env node

'use strict';

var program = require('commander'),
    actions = require('./actions');

program.command('put <file>')
    .description('Uploads a file to the server.')
    .action(actions.put)
    .on('--help', function() {
        console.log();
        console.log('   Examples:');
        console.log();
        console.log('   $ node cli/fileClient.js test.txt   # Uploads file test.txt to server');
    });

program.command('get')
    .description('List all files from server.')
    .action(actions.get);

program.command('del <file_UUID>')
    .description('Delete a file from the server using the files\' UUID.')
    .action(actions.del);

//console.log("Parent option values: " + program.parent._optionValues);

program.parse(process.argv);
