"use strict";

var _core = require("6to5-runtime/core-js")["default"];
var _regeneratorRuntime = require("6to5-runtime/regenerator")["default"];
var _to5Helpers = require("6to5-runtime/helpers")["default"];


/**
Reads a given filePath using `fs.readFile`, returning a promise
that resolves with the UTF8 contents of the file in a string

@async
@method readFile
@param filePath {String} Filepath to read from
@Return {String} UTF-8 encoded file contents
**/
exports.readFile = readFile;


/**
Parses a given peice of LESS as a string, and compiles an Abstract
Syntax Tree using the LESS libraries `parse` method.

@async
@method parse
@param filePath {String} Filepath to read contents from
@param [options] LESS Parser options
@return {Object} Object containg LESS AST Object instance and it's imports
**/
exports.parse = parse;


/**
Generates CSS output from a given AST node

@method toCSS
@param ast {Object} Root AST node to generate CSS for
@param imports {Object} Imports for the given AST
@param options {Object} LESS configuration obect
@return {String} Generated CSS
**/
exports.toCSS = toCSS;
var less = _to5Helpers.interopRequire(require("less"));

var fs = _to5Helpers.interopRequire(require("fs"));

var Parser = _to5Helpers.interopRequire(require("./parser"));

function readFile(filePath) {
	return _regeneratorRuntime.async(function readFile$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				return context$1$0.abrupt("return", new _core.Promise(function (resolve, reject) {
					fs.readFile(filePath, function (err, contents) {
						if (err) {
							reject(err);
						}
						resolve(contents.toString("utf8"));
					});
				}));
			case 1:
			case "end":
				return context$1$0.stop();
		}
	}, null, this);
}function parse(filePath, options) {
	var contents;
	return _regeneratorRuntime.async(function parse$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				context$1$0.next = 2;
				return readFile(filePath);
			case 2:
				contents = context$1$0.sent;
				return context$1$0.abrupt("return", new _core.Promise(function (resolve, reject) {
					less.parse(contents, options, function (err, root, imports, options) {
						if (err) {
							reject(err);
						}
						resolve({ root: root, imports: imports });
					});
				}));
			case 4:
			case "end":
				return context$1$0.stop();
		}
	}, null, this);
}function toCSS(ast, imports, options) {
	return new less.ParseTree(ast, imports, options).toCSS(options).css;
}
Object.defineProperty(exports, "__esModule", {
	value: true
});