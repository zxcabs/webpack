/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var NullDependency = require("./NullDependency");

function HarmonyExportDependency(name, range, rangeStatement) {
	NullDependency.call(this);
	this.Class = HarmonyExportDependency;
	this.name = name;
	this.range = range;
	this.rangeStatement = rangeStatement;
}
module.exports = HarmonyExportDependency;

HarmonyExportDependency.prototype = Object.create(NullDependency.prototype);

HarmonyExportDependency.Template = function HarmonyExportDependencyTemplate() {};

HarmonyExportDependency.Template.prototype.apply = function(dep, source) {
	var name = dep.name;
	if(typeof dep.name === "string") {
		name = [name];
	}
	if(Array.isArray(name)) {
		var content = name.map(function(name) {
			return "Object.defineProperty(exports, " + JSON.stringify(name) + ", {configurable: false, get: function() { return " + name + "; }});"
		}).join("");
		if(content) {
			source.replace(dep.range[0], dep.rangeStatement[0]-1, "{");
			source.replace(dep.rangeStatement[1], dep.range[1]-1, ";" + content + "}");
		} else {
			source.replace(dep.range[0], dep.rangeStatement[0]-1, "");
		}
	} else if(name && typeof name === "object") {
		var mapIdentifierToName = name;
		var content = "";
		Object.keys(mapIdentifierToName).forEach(function(key) {
			var name = mapIdentifierToName[key];
			var identifier = key.substr(1);
			content += "Object.defineProperty(exports, " + JSON.stringify(name) + ", {configurable: false, get: function() { return " + identifier + "; }});";
		});
		if(content) content = "{" + content + "}";
		source.replace(dep.range[0], dep.range[1], content);
	} else {
		throw new Error("TODO");
	}
}
