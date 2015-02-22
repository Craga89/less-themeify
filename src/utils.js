import less from 'less';
import fs from 'fs';
import Parser from './parser';

/**
Reads a given filePath using `fs.readFile`, returning a promise
that resolves with the UTF8 contents of the file in a string

@async
@method readFile
@param filePath {String} Filepath to read from
@Return {String} UTF-8 encoded file contents
**/
export async function readFile(filePath) {
	return new Promise(function(resolve, reject) {
		fs.readFile(filePath, function(err, contents) {
			if(err) { reject(err); }
			resolve(contents.toString('utf8'));
		});
	});
}

/**
Parses a given peice of LESS as a string, and compiles an Abstract
Syntax Tree using the LESS libraries `parse` method.

@async
@method parse
@param filePath {String} Filepath to read contents from
@param [options] LESS Parser options
@return {Object} Object containg LESS AST Object instance and it's imports
**/
export async function parse(filePath, options) {
	let contents = await readFile(filePath);

	return new Promise(function(resolve, reject) {
		less.parse(contents, options, function(err, root, imports, options) {
			if(err) { reject(err); }
			resolve({ root, imports });
		});
	});
}

/**
Generates CSS output from a given AST node

@method toCSS
@param ast {Object} Root AST node to generate CSS for
@param imports {Object} Imports for the given AST
@param options {Object} LESS configuration obect
@return {String} Generated CSS
**/
export function toCSS(ast, imports, options) {
	return (new less.ParseTree(ast, imports, options)).toCSS(options).css;
}