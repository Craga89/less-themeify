import {data as lessData} from 'less';

/**
Regular Expression that matches Hexadeicaml colour notations

@property rHex
@type RegExp
**/
var rHex = /#[0-9A-F]+/i;

/**
List of valid CSS colour names, taken directly from the LESS library.

@property names
@type Array
**/
var names = Object.keys(lessData.colors);

/**
Array of color methods in the LESS library. Unfortuantely there doesn't seem
to be an easy way to generate this list directly from the LESS internals, so
we'll keep this comprehensive list until such a time that this changes.

@property methods
@type Array
**/
var methods = [
	'multiply',
	'screen',
	'overlay',
	'softlight',
	'hardlight',
	'difference',
	'exclusion',
	'average',
	'negation',
	'rgb',
	'rgba',
	'hsl',
	'hsla',
	'hsv',
	'hsva',
	'hue',
	'saturation',
	'lightness',
	'hsvhue',
	'hsvsaturation',
	'hsvvalue',
	'red',
	'green',
	'blue',
	'alpha',
	'luma',
	'luminance',
	'saturate',
	'desaturate',
	'lighten',
	'darken',
	'fadein',
	'fadeout',
	'fade',
	'spin',
	'mix',
	'greyscale',
	'contrast',
	'argb',
	'color',
	'tint',
	'shade'
];

export default {
	names,
	methods,
	rHex,
	rNames: new RegExp(names.join('|')),
	rMethods: new RegExp(methods.join('|'))
}