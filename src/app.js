var less = require('less')
	, grunt = require('grunt')
	, path = require('path');

var lessOptions = {
	parse: ['paths', 'optimization', 'filename', 'strictImports', 'syncImport', 'dumpLineNumbers', 'relativeUrls', 'rootpath'],
	render: ['compress', 'cleancss', 'ieCompat', 'strictMath', 'strictUnits',
	   'sourceMap', 'sourceMapFilename', 'sourceMapURL', 'sourceMapBasepath', 'sourceMapRootpath', 'outputSourceFiles']
};

var compileLess = function(srcFile, options, callback, sourceMapCallback) {
	options = grunt.util._.extend({filename: srcFile}, options);

	var srcCode = grunt.file.read(srcFile)
		, parser = new less.Parser(grunt.util._.pick(options, lessOptions.parse));

	parser.parse(srcCode, function(parse_err, tree) {
		callback(tree);
	});
};


var parseValues = function(values) {
	return values.some(parseValue);
};

var parseValue = function(value) {
	// Multi-values
	if(value.value) {
		if(value.value.some) {
			return parseValues(value.value);
		}
	}

	// Handle mixins
	else if(value.args) {
		return parseMixin(value);
	}

	// Return if it contains a `brand` variable
	else if(value.name) {
		return value.name.indexOf('@brand') > -1;
	}

	return false;
};

var parseMixin = function(mixin) {
	return mixin.args.some(parseValue);
};

var parseRules = function(rules) {
	return rules.filter(parseRule);
};

var parseRule = function(rule) {
	// Always allow variables through
	if(rule.variable === true) {
		return true;
	}

	// Rules with values
	else if(rule.value) {
		if(rule.value.value.some) {
			return parseValues(rule.value.value);
		}

		else {
			return parseValue(rule.value);
		}
	}

	// Nested rules
	else if(rule.rules) {
		return (rule.rules = parseRules(rule.rules)).length;
	}

	// Unhandled
	return false;
};


// Compile it
var tree = {};
compileLess('./theme.less', {}, function(t) {
	t.rules = parseRules(t.rules);
	tree = t;

	console.log(tree.toCSS());
});

