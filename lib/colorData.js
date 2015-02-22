"use strict";

var _core = require("6to5-runtime/core-js")["default"];
var lessData = require("less").data;


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
var names = _core.Object.keys(lessData.colors);

/**
Array of color methods in the LESS library. Unfortuantely there doesn't seem
to be an easy way to generate this list directly from the LESS internals, so
we'll keep this comprehensive list until such a time that this changes.

@property methods
@type Array
**/
var methods = ["multiply", "screen", "overlay", "softlight", "hardlight", "difference", "exclusion", "average", "negation", "rgb", "rgba", "hsl", "hsla", "hsv", "hsva", "hue", "saturation", "lightness", "hsvhue", "hsvsaturation", "hsvvalue", "red", "green", "blue", "alpha", "luma", "luminance", "saturate", "desaturate", "lighten", "darken", "fadein", "fadeout", "fade", "spin", "mix", "greyscale", "contrast", "argb", "color", "tint", "shade"];

module.exports = {
	names: names,
	methods: methods,
	rHex: rHex,
	rNames: new RegExp(names.join("|")),
	rMethods: new RegExp(methods.join("|"))
};