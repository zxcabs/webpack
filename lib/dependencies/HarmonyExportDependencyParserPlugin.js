/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var AbstractPlugin = require("../AbstractPlugin");
var HarmonyExportDependency = require("./HarmonyExportDependency");
var HarmonyImportExportDependency = require("./HarmonyImportExportDependency");
var HarmonyExportModuleDependency = require("./HarmonyExportModuleDependency");
var LocalModulesHelpers = require("./LocalModulesHelpers");

module.exports = AbstractPlugin.create({
	"export declaration": function(statement, name) {
		var dep = new HarmonyExportDependency(name, statement.range, statement.declaration.range, this.scope.currentLocalModule);
		dep.loc = statement.loc;
		this.state.current.addDependency(dep);
		return true;
	},
	"export named": function(statement, mapIdentifierToName, request) {
		var localModule;
		if(!request) {
			var dep = new HarmonyExportDependency(mapIdentifierToName, statement.range, undefined, this.scope.currentLocalModule);
			dep.loc = statement.loc;
			this.state.current.addDependency(dep);
			return true;
		} else if(localModule = LocalModulesHelpers.getLocalModule(this.state, request)) {
			var dep = new HarmonyExportModuleDependency(localModule, mapIdentifierToName, statement.range);
			dep.loc = statement.loc;
			this.state.current.addDependency(dep);
			return true;
		} else {
			var dep = new HarmonyImportExportDependency(request, mapIdentifierToName, statement.range);
			dep.loc = statement.loc;
			this.state.current.addDependency(dep);
			return true;
		}
	},
	"export": function(statement, request) {
		var localModule = LocalModulesHelpers.getLocalModule(this.state, request);
		if(localModule) {
			var dep = new HarmonyExportModuleDependency(localModule, undefined, statement.range);
			dep.loc = statement.loc;
			this.state.current.addDependency(dep);
			return true;
		} else {
			var dep = new HarmonyImportExportDependency(request, undefined, statement.range);
			dep.loc = statement.loc;
			this.state.current.addDependency(dep);
			return true;
		}
	}
});

