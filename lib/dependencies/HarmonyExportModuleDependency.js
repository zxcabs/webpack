/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var NullDependency = require("./NullDependency");

function HarmonyExportModuleDependency(localModule, mapIdentifierToName, range) {
	NullDependency.call(this);
	this.Class = HarmonyExportModuleDependency;
	this.localModule = localModule;
	this.range = range;
	this.mapIdentifierToName = mapIdentifierToName;
}
module.exports = HarmonyExportModuleDependency;

HarmonyExportModuleDependency.prototype = Object.create(NullDependency.prototype);
HarmonyExportModuleDependency.prototype.type = "harmony export from local";

HarmonyExportModuleDependency.Template = function HarmonyExportModuleDependencyTemplate() {};

HarmonyExportModuleDependency.Template.prototype.apply = function(dep, source, outputOptions, requestShortener) {
	var mapIdentifierToName = dep.mapIdentifierToName;
	var name = dep.localModule.variableName();
	var content = "";
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
	source.replace(dep.range[0], dep.range[1]-1, content);
};
