/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var AbstractPlugin = require("../AbstractPlugin");
var HarmonyImportDependency = require("./HarmonyImportDependency");
var HarmonyImportModuleDependency = require("./HarmonyImportModuleDependency");
var LocalModulesHelpers = require("./LocalModulesHelpers");

module.exports = AbstractPlugin.create({
	"module import": function(statement, identifier, request) {
		var localModule = LocalModulesHelpers.getLocalModule(this.state, request);
		if(localModule) {
			var dep = new HarmonyImportModuleDependency(localModule, identifier, statement.range);
		} else {
			var dep = new HarmonyImportDependency(request, identifier, statement.range);
		}
		dep.loc = statement.loc;
		this.state.current.addDependency(dep);
		return true;
	},
	"import default": function(statement, identifier, request) {
		var localModule = LocalModulesHelpers.getLocalModule(this.state, request);
		if(localModule) {
			var dep = new HarmonyImportModuleDependency(localModule, identifier, statement.range);
		} else {
			var dep = new HarmonyImportDependency(request, identifier, statement.range);
		}
		dep.loc = statement.loc;
		this.state.current.addDependency(dep);
		return true;
	},
	"import named": function(statement, mapIdentifierToName, request) {
		var localModule = LocalModulesHelpers.getLocalModule(this.state, request);
		if(localModule) {
			var dep = new HarmonyImportModuleDependency(localModule, mapIdentifierToName, statement.range);
		} else {
			var dep = new HarmonyImportDependency(request, mapIdentifierToName, statement.range);
		}
		dep.loc = statement.loc;
		this.state.current.addDependency(dep);
		return true;
	},
	"import": function(statement, request) {
		var localModule = LocalModulesHelpers.getLocalModule(this.state, request);
		if(localModule) {
			var dep = new HarmonyImportModuleDependency(localModule, undefined, statement.range);
		} else {
			var dep = new HarmonyImportDependency(request, undefined, statement.range);
		}
		dep.loc = statement.loc;
		this.state.current.addDependency(dep);
		return true;
	}
});

