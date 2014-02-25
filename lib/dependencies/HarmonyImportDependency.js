/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var ModuleDependency = require("./ModuleDependency");

function HarmonyImportDependency(request, mapIdentifierToName, range) {
	ModuleDependency.call(this, request);
	this.Class = HarmonyImportDependency;
	this.range = range;
	this.mapIdentifierToName = mapIdentifierToName;
}
module.exports = HarmonyImportDependency;

HarmonyImportDependency.prototype = Object.create(ModuleDependency.prototype);
HarmonyImportDependency.prototype.type = "import";

HarmonyImportDependency.Template = function HarmonyImportDependencyTemplate() {};

HarmonyImportDependency.Template.prototype.apply = function(dep, source, outputOptions, requestShortener) {
	var mapIdentifierToName = dep.mapIdentifierToName;
	if(!mapIdentifierToName) {
		throw new Error("TODO");
	}
	var comment = "";
	if(outputOptions.pathinfo) comment = "/*! " + requestShortener.shorten(dep.request) + " */ ";
	if(dep.module) {
		var name = typeof mapIdentifierToName === "string" ? 
			mapIdentifierToName : 
			"__WEBPACK_IMPORTED_MODULE_" + dep.range.join("_") + "__";
		var content = "var " + name + " = require(" + comment + dep.module.id + ")";
		if(typeof mapIdentifierToName === "object") {
			Object.keys(mapIdentifierToName).forEach(function(key) {
				content += ", " + key.substr(1) + " = " + name + "[" + JSON.stringify(mapIdentifierToName[key]) + "]";
			});
		}
		content += ";"
	} else
		var content = "!(function webpackMissingModule() { throw new Error(" + JSON.stringify("Cannot find module \"" + dep.request + "\"") + "); }())";
	source.replace(dep.range[0], dep.range[1]-1, content);
};
