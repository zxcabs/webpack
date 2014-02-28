/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var NullDependency = require("./NullDependency");

function HarmonyModuleDependency(localModule, range, rangeBody) {
	NullDependency.call(this);
	this.Class = HarmonyModuleDependency;
	this.localModule = localModule;
	this.range = range;
	this.rangeBody = rangeBody;
}
module.exports = HarmonyModuleDependency;

HarmonyModuleDependency.prototype = Object.create(NullDependency.prototype);
HarmonyModuleDependency.prototype.type = "harmony module";

HarmonyModuleDependency.Template = function HarmonyModuleDependencyTemplate() {};

HarmonyModuleDependency.Template.prototype.apply = function(dep, source) {
	var prefix = "", surfix = "";
	
	var name = dep.localModule.variableName();
	prefix = "{ /* harmony module */ var " + name + " = {}; !(function(exports) {";
	surfix = "}.call(this, " + name + "))}";
	source.replace(dep.range[0], dep.rangeBody[0]-1, prefix);
	source.replace(dep.rangeBody[1], dep.range[1]-1, surfix);
}
