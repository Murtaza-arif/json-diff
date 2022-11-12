var argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');
const { getDiff } = require('./core/get-diff')

if (!argv['source']) {
    console.log("please provide source path");
    return
}
if (!argv['destination']) {
    console.log("please provide destination path");
    return
}
if (!argv['fieldmapping']) {
    console.log("please provide fieldmapping path");
    return
}
if (!argv['keymapping']) {
    console.log("please provide keymapping path");
    return
}
if (!argv['recordmapping']) {
    console.log("please provide recordmapping path");
    return
}
let source = JSON.parse(fs.readFileSync(argv['source']));
let destination = JSON.parse(fs.readFileSync(argv['destination']));
let fieldmapping = JSON.parse(fs.readFileSync(argv['fieldmapping']));
let keymapping = JSON.parse(fs.readFileSync(argv['keymapping']));
let recordmapping = JSON.parse(fs.readFileSync(argv['recordmapping']));
console.log(getDiff(source, destination, fieldmapping, keymapping, recordmapping));