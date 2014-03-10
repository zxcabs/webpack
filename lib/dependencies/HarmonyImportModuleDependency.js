/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var NullDependency = require("./NullDependency");

function HarmonyImportModuleDependency(localModule, mapIdentifierToName, range) {
	NullDependency.call(this);
	this.Class = HarmonyImportModuleDependency;
	this.localModule = localModule;
	this.range = range;
	this.mapIdentifierToName = mapIdentifierToName;
}
module.exports = HarmonyImportModuleDependency;

HarmonyImportModuleDependency.prototype = Object.create(NullDependency.prototype);
HarmonyImportModuleDependency.prototype.type = "harmony import local";

HarmonyImportModuleDependency.Template = function HarmonyImportModuleDependencyTemplate() {};

HarmonyImportModuleDependency.Template.prototype.apply = function(dep, source, outputOptions, requestShortener) {
	var mapIdentifierToName = dep.mapIdentifierToName;
	if(typeof mapIdentifierToName === "string") {
		var content = "var " + mapIdentifierToName + " = " + dep.localModule.variableName() + ";";
	} else if(mapIdentifierToName && typeof mapIdentifierToName === "object") {
		var name = dep.localModule.variableName();
		var content = "var " + Object.keys(mapIdentifierToName).map(function(key) {
			return key.substr(1) + " = " + name + "[" + JSON.stringify(mapIdentifierToName[key]) + "]";
		}).join(", ") + ";";
	}
	source.replace(dep.range[0], dep.range[1]-1, content);
};
