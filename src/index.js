import Parser from './parser';
import {parse, toCSS} from './utils';

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
export default async function themeify(filePath, options) {
	// Generate regular old LESS AST using the libraries internal
	// `parse` method, which is wrapped for access to the `imports`
	// property but in an async way
	let { root: ast, imports: imports } = await parse(filePath, options);

	// Parse the produced AST for any and all theme-ish properties, 
	// filtering out parts of the AST that do not contain them
	Parser.modify(ast);

	// Generate and return the CSS of the modified AST, producing styles
	// that only contain theme-ish properties :)
	return toCSS(ast, imports, options);
};

