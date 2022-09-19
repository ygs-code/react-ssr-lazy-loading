"use strict";
var copyFile = require("./copyFile");
var readFile = require("./readFile");
var writeFile = require("./writeFile");
var watchFile = require("./watchFile");
var readWriteFiles = require("./readWriteFiles");
var stringToObject = require("./stringToObject");
var alias = require("./alias");


module.exports = {
    alias,
    copyFile,
    readFile,
    writeFile,
    watchFile,
    readWriteFiles,
    stringToObject
};
