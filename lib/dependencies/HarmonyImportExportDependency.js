/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var ModuleDependency = require("./ModuleDependency");

function HarmonyImportExportDependency(request, mapIdentifierToName, range) {
	ModuleDependency.call(this, request);
	this.Class = HarmonyImportExportDependency;
	this.range = range;
	this.mapIdentifierToName = mapIdentifierToName;
}
module.exports = HarmonyImportExportDependency;

HarmonyImportExportDependency.prototype = Object.create(ModuleDependency.prototype);
HarmonyImportExportDependency.prototype.type = "harmony export from";

HarmonyImportExportDependency.Template = function HarmonyImportExportDependencyTemplate() {};

HarmonyImportExportDependency.Template.prototype.apply = function(dep, source, outputOptions, requestShortener) {
	var mapIdentifierToName = dep.mapIdentifierToName;
	var comment = "";
	if(outputOptions.pathinfo) comment = "/*! " + requestShortener.shorten(dep.request) + " */ ";
	if(dep.module) {
		var name = "__WEBPACK_IMPORTED_MODULE_" + dep.range.join("_") + "__";
		var content = "{var " + name + " = __webpack_require__(" + comment + dep.module.id + ");";
		if(mapIdentifierToName && typeof mapIdentifierToName === "object") {
			Object.keys(mapIdentifierToName).forEach(function(key) {
				content += "Object.defineProperty(exports, " + JSON.stringify(key.substr(1)) + ", { configurable: false, enumerable: true, ";
				content += "get: function() { return " + name + "[" + JSON.stringify(mapIdentifierToName[key]) + "]; } });";
			});
		} else {
			content += "for(var __WEBPACK_IMPORT_NAME__ in " + name + ") ";
			content += "Object.defineProperty(exports, __WEBPACK_IMPORT_NAME__, { configurable: false, enumerable: true, ";
			content += "get: (function(key) { return function() { return " + name + "[key]; }; }(__WEBPACK_IMPORT_NAME__)) });";
		}
		content += ";}"
	} else
		var content = "!(function webpackMissingModule() { throw new Error(" + JSON.stringify("Cannot find module \"" + dep.request + "\"") + "); }())";
	source.replace(dep.range[0], dep.range[1]-1, content);
};
