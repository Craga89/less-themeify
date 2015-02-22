"use strict";

var _regeneratorRuntime = require("6to5-runtime/regenerator")["default"];
var _to5Helpers = require("6to5-runtime/helpers")["default"];


/**
Takes a given .less file and outputs any and all rules which have
theme-ish properties i.e. colours. Completely filters selectors with 
no such properties, as well as individual rules.

Supports mixins and @import directives, too.

@async
@method themeify
@param filePath {String} Filepath to read contents from
@param [options] LESS Parser options
@return {String} Resulting CSS
**/
module.exports = themeify;
var Parser = _to5Helpers.interopRequire(require("./parser"));

var _utils = require("./utils");

var parse = _utils.parse;
var toCSS = _utils.toCSS;
function themeify(filePath, options) {
	var _ref, ast, imports;
	return _regeneratorRuntime.async(function themeify$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				context$1$0.next = 2;
				return parse(filePath, options);
			case 2:
				_ref = context$1$0.sent;
				ast = _ref.root;
				imports = _ref.imports;


				// Parse the produced AST for any and all theme-ish properties,
				// filtering out parts of the AST that do not contain them
				Parser.modify(ast);

				return context$1$0.abrupt("return", toCSS(ast, imports, options));
			case 7:
			case "end":
				return context$1$0.stop();
		}
	}, null, this);
}
// Generate regular old LESS AST using the libraries internal
// `parse` method, which is wrapped for access to the `imports`
// property but in an async way
// Generate and return the CSS of the modified AST, producing styles
// that only contain theme-ish properties :)